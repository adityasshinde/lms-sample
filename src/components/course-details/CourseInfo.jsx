import React, { useState } from 'react';
import { Grid, Typography, IconButton, Card, CardContent, Button, Divider, useMediaQuery, Dialog, DialogContent } from '@mui/material';
import { IconBookmark, IconCalendar, IconChecklist, IconChecks, IconDevices, IconHeartHandshake, IconPlaystationTriangle, IconPoint, IconShare, IconStar, IconVocabulary } from '@tabler/icons';
import { useAuth, useCourse, useHome } from '../../hooks/hooks';
import { Box } from '@mui/system';
import GradientButton from '../form/GradientButton';
import checkImg from '../../asset/images/check.png';
import { useDispatch } from 'react-redux';
import { setCheckoutCourseId } from '../../store/slices/paymentSlice';
import { setAuthState, setRedirectLocation, setUser, userLogout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from '../../store/api/authApi';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '../../store/slices/courseSlice';
import LoadingOverlay from '../molecules/LoadingOverlay';
import ConfirmationPopup from '../molecules/ConfirmationPopup';
import { useEnrollFreeCourseMutation } from '../../store/api/paymentApi';
import NormalLink from '../form/NormalLink';
import { setLmsCourse } from '../../store/slices/lmsSlice';
import { useEffect } from 'react';
import PaymentResponse from '../checkout/PaymentResponse';
import img19 from '../../asset/images/image 19.png';
import img20 from '../../asset/images/image 20.png';
import img21 from '../../asset/images/image 21.png';

const CourseInfo = ({ course, scrollTo, currentTab, lectures, events }) => {
    const [confirm, setConfirm] = useState(false);
    const { categories } = useHome();
    const { wishList } = useCourse();
    const { isAuth, user } = useAuth();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const [enrollFreeCourseMutation, { isLoading: freeEnrollLoading, isSuccess: enrollSuccess, isError: enrollError }] = useEnrollFreeCourseMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addToWishlistMutation, { isLoading: loadingAdd }] =
        useAddToWishlistMutation();
    const [removeFromWishlistMutation, { isLoading: loadingRemove }] =
        useRemoveFromWishlistMutation();
    const category = categories?.find((cat) => cat._id === course.category);
    const isPurchased = user?.coursesPurchased?.includes(course._id);
    const isWishlisted = wishList?.includes(course._id);
    const priceText = `Rs. ${parseInt(course.discountedPrice)}`;
    const isFree = course.discountedPrice === 0;
    const actualPriceText =
        course.actualPrice === undefined
            ? `Rs. ${parseInt(course.discountedPrice * 1.5)}`
            : `Rs. ${parseInt(course.actualPrice)}`;
    const percentDiscount = course?.discountedPrice === 0 ? 'FREE' : `${parseInt(
        ((course.actualPrice - course.discountedPrice) / course.actualPrice) * 100
    )}% off`;
    const handleRemoveFromWishlist = async () => {
        setConfirm(false);
        const result = await removeFromWishlistMutation(course._id);
        if (result.data) {
            dispatch(removeFromWishlist(course._id));
            toast.success("Course removed from wishlist", {
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
            const result = await addToWishlistMutation(course._id);
            if (result.data) {
                dispatch(addToWishlist(course._id));
                toast.success("Course added to wishlist", {
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
            const result = await enrollFreeCourseMutation(product._id);
            if (result.data) {
                dispatch(setUser(result.data));
                setTimeout(() => {
                    navigate(`/lms/my_courses/${course?._id}`);
                }, 2000);
            }
            return;
        }
        // add logic for Buy now
        dispatch(setCheckoutCourseId(product._id));
        navigate(`/lms/checkout/${product._id}`);
    };


    return (
        <Grid container sx={{ width: '100%', padding: lgUp ? '0 6%' : '0 4%', display: 'flex', flexWrap: 'wrap-reverse' }}>
            {(loadingAdd || loadingRemove) && (
                <LoadingOverlay
                    open={loadingAdd || loadingRemove}
                    message="Updating your wishlist, please wait..."
                />
            )}
            {(freeEnrollLoading || enrollSuccess || enrollError) && (
                <Dialog
                    open={freeEnrollLoading || enrollSuccess || enrollError}
                    aria-labelledby="payment-verification-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogContent>
                        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '300px', height: '300px' }}>
                            <PaymentResponse type={freeEnrollLoading && "pending" || enrollSuccess && "success" || enrollError && "failed"} message={freeEnrollLoading && "Processing your request, please wait..." || enrollSuccess && "Enrolled successfully" || enrollError && "Failed to enroll"} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
            {confirm && (
                <ConfirmationPopup
                    heading="Confirm"
                    message="Are you sure you want to remove course from wishlist?"
                    acceptButton="Remove"
                    onAccept={handleRemoveFromWishlist}
                    onCancel={() => setConfirm(false)}
                />
            )}
            <Grid id="overview" item xs={12} md={7} padding='1rem 0'>
                <Box display='flex' justifyContent='start' width='70%' mt='1.6rem'>
                    <a onClick={() => scrollTo('overview')}><Typography sx={{ paddingBottom: currentTab === 'overview' ? '0.3rem' : '0', color: currentTab === 'overview' ? '#207EB8' : '#4B4B4D', borderBottom: currentTab === 'overview' ? '3px solid #207EB8' : '0', fontSize: '1rem', mr: '2rem', fontWeight: '600', mb: '1rem', cursor: 'pointer' }}>Overview</Typography></a>
                    <a onClick={() => scrollTo('tutors')}><Typography sx={{ paddingBottom: currentTab === 'tutors' ? '0.3rem' : '0', color: currentTab === 'tutors' ? '#207EB8' : '#4B4B4D', borderBottom: currentTab === 'tutors' ? '3px solid #207EB8' : '0', fontSize: '1rem', mr: '2rem', fontWeight: '600', mb: '1rem', mr: '2rem', cursor: 'pointer' }}>Tutors</Typography></a>
                    {lectures?.length > 0 ? <a onClick={() => scrollTo('syllabus')}><Typography sx={{ paddingBottom: currentTab === 'syllabus' ? '0.3rem' : '0', color: currentTab === 'syllabus' ? '#207EB8' : '#4B4B4D', borderBottom: currentTab === 'syllabus' ? '3px solid #207EB8' : '0', fontSize: '1rem', mr: '2rem', fontWeight: '600', mb: '1rem', cursor: 'pointer' }}>Syllabus</Typography></a> : <></>}
                    {events?.length > 0 ? <a onClick={() => scrollTo('timetable')}><Typography sx={{ paddingBottom: currentTab === 'timetable' ? '0.3rem' : '0', color: currentTab === 'timetable' ? '#207EB8' : '#4B4B4D', borderBottom: currentTab === 'timetable' ? '3px solid #207EB8' : '0', fontSize: '1rem', mr: '2rem', fontWeight: '600', mb: '1rem', cursor: 'pointer' }}>TimeTable</Typography></a> : <></>}
                    <a onClick={() => scrollTo('reviews')}><Typography sx={{ paddingBottom: currentTab === 'reviews' ? '0.3rem' : '0', color: currentTab === 'reviews' ? '#207EB8' : '#4B4B4D', borderBottom: currentTab === 'reviews' ? '3px solid #207EB8' : '0', fontSize: '1rem', mr: '2rem', fontWeight: '600', mb: '1rem', cursor: 'pointer' }}>Reviews</Typography></a>
                </Box>
                <Divider sx={{ color: 'black', mt: '-1rem' }} variant='fullWidth' />
                <Box mt='2.5rem' mb='2.5rem'>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: '600', mb: '1rem' }}>
                        Course Overview
                    </Typography>
                    <Typography sx={{ overflow: 'hidden', fontSize: '1rem', fontWeight: '500', display: 'flex', mt: '0.5rem', color: '#4B4B4D' }}>
                        Helping employees gain skills and providing career development often take a back seat to business priorities but workplace. topics that keep your level.
                        We offer fresh courses on emerging topics that keep your level. We offer se
                        offer fresh courses on emerging topics that keep your level. We are
                    </Typography>

                    {/* <span style={{ color: '#207EB8', fontSize: '0.8rem' }} >+ Read more</span> */}
                </Box>
                <Box mt='2.5rem' mb='2.5rem' display='flex' flexWrap='wrap' justifyContent='space-around'>
                    <div className='flex flex-col items-center justify-center w-[100px]'>
                        <img src={img19} alt='Loading img' width='80%' />
                        <Typography sx={{ textAlign:'center', fontWeight: '500', display: 'flex', mt: '0.5rem', color: '#4B4B4D' }}>
                        Exclusively tailored CUET E-books
                        </Typography>
                    </div>
                    <div className='flex flex-col items-center justify-center w-[100px]'>
                        <img src={img20} alt='Loading img' width='80%' />
                        <Typography sx={{ textAlign:'center', fontWeight: '500', display: 'flex', mt: '0.5rem', color: '#4B4B4D' }}>
                        800+  hrs of live/recorded lectures
                        </Typography>
                    </div>
                    <div className='flex flex-col items-center justify-center w-[100px]'>
                        <img src={img21} alt='Loading img' width='80%' />
                        <Typography sx={{ textAlign:'center', fontWeight: '500', display: 'flex', mt: '0.5rem', color: '#4B4B4D' }}>
                        150+  mocks & 3000+  topic-wise tests
                        </Typography>
                    </div>


                    {/* <span style={{ color: '#207EB8', fontSize: '0.8rem' }} >+ Read more</span> */}
                </Box>
                <Box my='2.5rem'>
                    <Typography sx={{ fontSize: '1.4rem', fontWeight: '600', mb: '1rem' }}>
                        {"What you’ll learn?"}
                    </Typography>
                    <Box display='flex' alignItems="top" my='0.5rem'>
                        <IconChecks color='#4B4B4D99' style={{ marginRight: '10px', opacity: '60%' }} />
                        <Typography sx={{ fontWeight: '500', display: 'flex', color: '#4B4B4D' }}>
                            Helping employees gain skills and providing career development often take a back seat to business priorities but workplace.
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems="top" my='0.5rem'>
                        <IconChecks color='#4B4B4D99' style={{ marginRight: '10px', opacity: '60%' }} />
                        <Typography sx={{ fontWeight: '500', display: 'flex', color: '#4B4B4D' }}>
                            We offer fresh courses on emerging topics that keep your level.
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems="top" my='0.5rem'>
                        <IconChecks color='#4B4B4D99' style={{ marginRight: '10px', opacity: '60%' }} />
                        <Typography sx={{ fontWeight: '500', display: 'flex', color: '#4B4B4D' }}>
                            Helping employees gain skills and providing career development
                        </Typography>
                    </Box>
                </Box>
                <Box my='3rem'>
                    <Typography sx={{ fontSize: '1.4rem', fontWeight: '600', mb: '1rem' }}>
                        Benefit of this course
                    </Typography>
                    <Box display='flex' alignItems="center" my='0.5rem'>
                        <img src={checkImg} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                        <Typography sx={{ fontWeight: '500', display: 'flex', color: '#4B4B4D' }}>
                            Crack JEE
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems="center" my='0.5rem'>
                        <img src={checkImg} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                        <Typography sx={{ fontWeight: '500', display: 'flex', color: '#4B4B4D' }}>
                            Score good in 12th board
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                <Card sx={{ boxShadow: '0 0 8px #4B4B4D99', alignSelf: 'end', width: lgUp ? '80%' : '100%', padding: '0 !important', borderRadius: '0 0 9px 9px' }}>
                    <CardContent>
                        <Grid container direction="column" justifyContent="space-between">
                            <Typography sx={{ color: "#4B4B4D", fontSize: "0.9rem" }}>
                                Price
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}>
                                    <Typography fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
                                        {priceText}
                                    </Typography>
                                    <Typography component="del" color="textSecondary" sx={{ color: "#4B4B4D", ml: "10px", fontSize: "0.8rem", lineHeight: "14px" }}>
                                        {actualPriceText}
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: "#FFD91A", ml: "10px", fontWeight: '500', fontSize: "1.3rem", lineHeight: "14px" }}>
                                    {percentDiscount}
                                </Typography>
                            </Box>
                            <Grid container columns={6} width='100%' sx={{ mt: '1rem', px: '0px !important', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Grid item xs={4}>
                                    {isPurchased ?
                                        <NormalLink
                                            to={`/lms/my_courses/${course._id}`}
                                            text="Go to Learning"
                                            type='button'
                                            onClick={() => dispatch(setLmsCourse(course))}
                                        />
                                        : <GradientButton
                                            onClick={() => { handleBuyNow(course) }}
                                            text='Enroll Now'
                                            type='button' />}
                                </Grid>
                                <Grid item xs={1} display='flex' justifyContent='end'>
                                    <button
                                        style={{ border: '1px solid #9e9e9e', padding: '8px', borderRadius: '8px', backgroundColor: 'transparent' }}
                                        onClick={wishListHandler}
                                    >
                                        {!isWishlisted ? (
                                            <IconBookmark color="#4B4B4D" size={26} />
                                        ) : (
                                            <IconBookmark
                                                color="red"
                                                fill="red"
                                                size={26}
                                            />
                                        )}
                                    </button>
                                </Grid>
                                <Grid item xs={1} display='flex' justifyContent='end'>
                                    <button
                                        style={{ border: '1px solid #9e9e9e', padding: '8px', borderRadius: '8px', backgroundColor: 'transparent' }}
                                    // onClick={wishListHandler}
                                    >
                                        <IconShare color="#4B4B4D" size={26} />

                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <IconButton aria-label="bookmark" color="primary">
                            {/* <BookmarkIcon /> */}
                        </IconButton>
                        <IconButton aria-label="share" color="primary">
                            {/* <ShareIcon /> */}
                        </IconButton>
                        <Divider sx={{ width: '100%', mb: '1rem' }} />
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', mb: '1rem' }}>
                            Course Highlights
                        </Typography>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', display: 'flex', my: '0.5rem', color: '#4B4B4DCC' }}>
                                <IconPlaystationTriangle style={{ transform: "rotate(-30deg)", marginRight: '10px' }} stroke={1.5} /> Recorded lectures
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', display: 'flex', my: '0.5rem', color: '#4B4B4DCC' }}>
                                <IconHeartHandshake style={{ marginRight: '10px' }} stroke={1.5} /> Mentorship
                            </Typography>

                            <Typography sx={{ fontWeight: 'bold', display: 'flex', my: '0.5rem', color: '#4B4B4DCC' }}>
                                <IconCalendar style={{ marginRight: '10px' }} stroke={1.5} /> {course?.validity ? course?.validity : '1'} months of validity
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', display: 'flex', my: '0.5rem', color: '#4B4B4DCC' }}>
                                <IconChecklist style={{ marginRight: '10px' }} stroke={1.5} /> Test series
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', display: 'flex', my: '0.5rem', color: '#4B4B4DCC' }}>
                                <IconDevices style={{ marginRight: '10px' }} stroke={1.5} /> Access on mobile and TV
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold', display: 'flex', my: '0.5rem', color: '#4B4B4DCC' }}>
                                <IconVocabulary style={{ marginRight: '10px' }} stroke={1.5} /> Conceptual lectures
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <Box my='1rem' sx={{ paddingLeft: lgUp ? '20%' : '5%' }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: '600', mb: '0.5rem' }}>
                        Related Courses
                    </Typography>
                    <Box display='flex' alignItems="center" mb='0.5rem' sx={{ cursor: 'pointer' }}>
                        <IconPoint fill='#207EB8' color='#207EB8' size={16} style={{ marginRight: '5px' }} />
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: '500', display: 'flex', color: '#207EB8' }}>
                            Molecular system | chapter 01 | part 2
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems="center" mb='0.5rem' sx={{ cursor: 'pointer' }}>
                        <IconPoint fill='#207EB8' color='#207EB8' size={16} style={{ marginRight: '5px' }} />
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: '500', display: 'flex', color: '#207EB8' }}>
                            JEE mains | 12th CBSC board | pasrt 01
                        </Typography>
                    </Box>
                    <Box display='flex' alignItems="center" mb='0.5rem' sx={{ cursor: 'pointer' }}>
                        <IconPoint fill='#207EB8' color='#207EB8' size={16} style={{ marginRight: '5px' }} />
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: '500', display: 'flex', color: '#207EB8' }}>
                            Molecular system | chapter 01 | part 3
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default CourseInfo;
