import React, { useState } from 'react';
import { Card, CardContent, Divider, CardHeader, CardMedia, Typography, IconButton, Button } from '@mui/material';
import { Box } from '@mui/system';
import { IconBookmark, IconShare, IconStar } from '@tabler/icons';
import GradientButton from '../form/GradientButton';
import GradientLink from '../form/GradientLink';
import NormalLink from '../form/NormalLink';
import discountVector from "../../asset/images/Vector.png";
import { useAuth, useCourse, useHome } from '../../hooks/hooks';
import { setAuthState, setRedirectLocation, userLogout } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from '../../store/api/authApi';
import { addToWishlist, removeFromWishlist } from '../../store/slices/courseSlice';
import { toast } from 'react-toastify';
import LoadingOverlay from '../molecules/LoadingOverlay';
import ConfirmationPopup from '../molecules/ConfirmationPopup';



const TestSeriesCard = ({ series }) => {
    const { user, isAuth } = useAuth();
    const { wishList } = useCourse();
    const { categories } = useHome();
    const [confirm, setConfirm] = useState(false);
    const dispatch = useDispatch();
    const [addToWishlistMutation, { isLoading: loadingAdd }] =
        useAddToWishlistMutation();
    const [removeFromWishlistMutation, { isLoading: loadingRemove }] =
        useRemoveFromWishlistMutation();
    const navigate = useNavigate();
    const priceText = `Rs.${parseInt(series?.discountedPrice)}`;
    const isPurchased = user?.testsPurchased?.includes(series?._id);
    const isWishlisted = wishList?.includes(series?._id);

    const category = categories?.find((cat) => cat._id === series?.category);
    const actualPriceText =
        series?.actualPrice === undefined
            ? `Rs.${parseInt(series?.discountedPrice * 1.5)}`
            : `Rs.${parseInt(series?.actualPrice)}`;
    const percentDiscount = series?.discountedPrice === 0 ? 'FREE' : `${parseInt(
        ((series?.actualPrice - series?.discountedPrice) / series?.actualPrice) * 100
    )}%`;
    const isFree = series?.discountedPrice === 0;
    const handleRemoveFromWishlist = async () => {
        setConfirm(false);
        const result = await removeFromWishlistMutation(series?._id);
        if (result.data) {
            dispatch(removeFromWishlist(series?._id));
            toast.success("Test Series removed from wishlist", {
                position: "top-center",
                autoClose: 2000,
            });
        }
        if (result.error?.status === 401) {
            dispatch(userLogout());
            dispatch(setAuthState(1));
        }
        console.log(result);
    };
    const wishListHandler = async () => {
        if (!isAuth) {
            dispatch(setRedirectLocation(window.location.pathname));
            dispatch(setAuthState(1));
            return;
        }
        if (isWishlisted) {
            setConfirm(true);
            return;
        } else {
            const result = await addToWishlistMutation(series?._id);
            if (result.data) {
                dispatch(addToWishlist(series?._id));
                toast.success("Test Series added to wishlist", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
            if (result.error?.status === 401) {
                dispatch(userLogout());
                dispatch(setAuthState(1));
            }
            console.log(result);
        }
    };
    const handleBuyNow = async (product) => {
        if (!isAuth) {
            dispatch(setAuthState(1));
            dispatch(setRedirectLocation(`/lms/checkout/${product._id}`));
            return;
        }
        if (!(user.profileComplete && user.emailVerified)) {
            dispatch(setAuthState(7));
            dispatch(setRedirectLocation(`/lms/checkout/${product._id}`));
            return;
        }
        if (isFree) {
            // const result = await enrollFreeCourseMutation(product._id);
            // if (result.data) {
            //     dispatch(setUser(result.data));
            //     setTimeout(() => {
            //         navigate(`/lms/my_courses/${series?._id}`);
            //     }, 2000);
            // }
            // return;
        }
        console.log("here")
        // add logic for Buy now
        // dispatch(setCheckoutCourseId(product._id));
        navigate(`/lms/checkout/${product._id}`);
    };
    return (
        <Box
            className='relative mx-2'
            sx={{
                transition: "transform 0.3s ease-in-out",
                "&:hover, &:focus": {
                    transform: "scale(1.03)",
                }
            }}
        >
            {(loadingAdd || loadingRemove) && (
                <LoadingOverlay
                    open={loadingAdd || loadingRemove}
                    message="Updating your wishlist, please wait..."
                />
            )}
            {confirm && (
                <ConfirmationPopup
                    heading="Confirm"
                    message="Are you sure you want to remove test series from wishlist?"
                    acceptButton="Remove"
                    onAccept={handleRemoveFromWishlist}
                    onCancel={() => setConfirm(false)}
                />
            )}
            <div style={{ position: "absolute", top: "-2rem", left: "-2rem" }}>
                <img src={discountVector} alt="discount vector" />
            </div>
            <Typography
                sx={{
                    zIndex: 12,
                    position: "absolute",
                    transform: "rotate(-20deg)",
                    fontWeight: "bold",
                    textAlign: "center",
                    lineHeight: percentDiscount !== "FREE" && "1",
                }}
            >
                {percentDiscount}
                {percentDiscount !== "FREE" && <br />}
                {percentDiscount !== "FREE" && "off"}
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    borderRadius: "8px",
                    border: '1px solid #4B4B4D18',
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: '0',

                }}>
                <button
                    onClick={wishListHandler}
                    className="wishlist-btn absolute m-3 rounded-full z-10 right-0"
                >
                    {!isWishlisted ? (
                        <IconBookmark color="#4B4B4D" className="mx-auto" size="1.8rem" />
                    ) : (
                        <IconBookmark
                            color="red"
                            fill="red"
                            className="mx-auto"
                            size="1.8rem"
                        />
                    )}
                </button>
                <CardMedia
                    component="img"
                    width="100%"
                    className="aspect-[16/9]"
                    image={series?.thumbnailUrl} // Replace with your actual thumbnail image URL
                    alt="Physics Test"
                />
                <CardHeader
                    sx={{ width: '100%', px: '1rem' }}
                    title={
                        <Typography variant='h4' sx={{ fontWeight: 'bold', height: '40px', color: '#4B4B4D', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {series?.title}
                            

                        </Typography>
                    }
                />
                <CardContent sx={{ padding: '0 1rem' }}>
                    {/* <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <IconStar fill='#F58C29' color='white' size={28} style={{ marginRight: '2px' }} />Attempt First Test for Free
                    </Typography> */}
                    {/* <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'start', mb: '5px' }}>
                        <IconStar fill='#F58C29' color='white' size={28} style={{ marginRight: '2px' }} />Chapter-wise tests
                    </Typography> */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0",
                        }}
                    >
                        <Typography

                            sx={{
                                fontWeight: "bold",
                                padding: "6px 12px",
                                borderRadius: "8px",
                                fontSize: { xs: "0.8rem", md: '1rem' },
                                bgcolor: "#c6e0f7",
                            }}
                        >
                            {category?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: "flex", alignItems: "center", fontSize: { xs: "0.8rem", md: '1rem' }, }}
                        >
                            <IconStar size={24} stroke={1} />
                            <span className="ml-2">{series.lectures?.length || '02'} Tests</span>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: "flex", alignItems: "center", fontSize: { xs: "0.8rem", md: '1rem' } }}
                        >
                            <IconStar
                                size={24}
                                stroke={1}
                                style={{
                                    padding: "5px",
                                    backgroundColor: "#FFF0A6",
                                    borderRadius: "50%",
                                    color: "#EFC800",
                                }}
                            />
                            <span className="ml-2">{series?.averageRating ? series.averageRating : "4.5"}</span>
                        </Typography>
                    </div>
                    {/*                 
                <Typography sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'start', mt: '5px', mb: '12px' }}>
                    <IconStar fill='#F58C29' color='white' size={28} style={{ marginRight: '2px' }} />Detailed analysis
                </Typography> */}
                    <Divider sx={{ my: 2, backgroundColor: "#4B4B4D" }} />
                    <div className="grid grid-cols-2 my-2 ">
                        <div className="flex flex-col justify-between">
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ color: "#4B4B4D", fontSize: "0.9rem" }}
                            >
                                Price
                            </Typography>
                            <div className="flex flex-row items-end">
                                <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                                    {priceText}
                                </Typography>
                                <Typography
                                    component="del"
                                    color="textSecondary"
                                    sx={{
                                        color: "#4B4B4D",
                                        ml: "2px",
                                        fontSize: "0.8rem",

                                        lineHeight: "14px",
                                    }}
                                >
                                    {actualPriceText}
                                </Typography>
                            </div>
                        </div>
                        {isPurchased ?
                            <NormalLink
                                to={`/lms/my_test_series/${series?._id}`}
                                text="Go to Learning"
                                type='button'
                            // onClick={() => dispatch(setLmsCourse(series))}
                            />
                            : <GradientButton onClick={() => handleBuyNow(series)} text='Get Started' />
                        }
                    </div>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TestSeriesCard;
