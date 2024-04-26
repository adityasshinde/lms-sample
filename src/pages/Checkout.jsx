import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import GradientButton from "../components/form/GradientButton";
// import LoadingOverlay from "../components/molecules/LoadingOverlay";
import ErrorComponent from "../components/ui/ErrorComponent";
import Loader from "../components/ui/Loader";
import { usePayment } from "../hooks/hooks";
import { useGetStudentProfileMutation } from "../store/api/authApi";
import { useGetCourseByIdQuery } from "../store/api/courseApi";
import {
  useApplyCouponCodeMutation,
  usePurchaseCourseMutation,
  usePurchaseTestSeriesMutation,
  useVerifyPaymentMutation,
} from "../store/api/paymentApi";
import { setOrderId } from "../store/slices/paymentSlice";
import LoadingButton from "../components/form/LoadingButton";
import { Button, Divider, TextField, Typography, useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import PaymentStatus from "../components/checkout/PaymentStatus";
import { IconX } from "@tabler/icons";
import { useEffect } from "react";
import { useGetTestSeriesByIdQuery } from "../store/api/lmsApi";

const Checkout = () => {
  const {productId}=useParams();
  const {
    data: course,
    isLoading,
    isError,
    refetch,
  } = useGetCourseByIdQuery(productId);
  const {data:testSeries,isLoading:testSeriesLoading,isError:testSeriesError,refetch:refetchTestSeries}=useGetTestSeriesByIdQuery(productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product,setProduct]=useState();
  const [couponCode, setCouponCode] = useState("");
  const [newDiscountedPrice, setNewDiscountedPrice] = useState(course?.discountedPrice);
  const [couponApplied, setCouponApplied] = useState(false);
  const [verifyPayment] = useVerifyPaymentMutation();
  const [verifyPaymentDialog, setVerifyPaymentDialog] = useState(false);
  const [applyCouponCodeMutation,{isLoading:couponCodeLoading}]=useApplyCouponCodeMutation();
  const [purchaseCourseMutation, { isLoading: orderLoading }] =
    usePurchaseCourseMutation();
  const [purchaseTestSeries,{isLoading:testSeriesOrderLoading}]=usePurchaseTestSeriesMutation();
  const [getStudentProfileMutation] = useGetStudentProfileMutation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const initPayment = (data) => {
    dispatch(setOrderId(data?.orderId));
    const truncatedDescription =
      data.description.length > 255
        ? data.description.substring(0, 252) + "..."
        : data.description;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data?.amount,
      currency: "INR",
      name: data?.productName,
      description: truncatedDescription,
      image: data?.imageURI,
      order_id: data?.orderId,
      handler: async (response) => {
        // navigate("verify");
        setVerifyPaymentDialog(true);
      },
      theme: {
        color: "#0074BA",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {

      let result;
      if(course){
        const credentials={
          courseId:product?._id,
          couponCodeName:couponCode
        }
        result = await purchaseCourseMutation(credentials);
      }
      if(testSeries){
        const credentials={
          testId:product?._id,
          couponCodeName:couponCode
        }
        result = await purchaseTestSeries(credentials);
      }
      if(result.data){
      // let purchaseData={...result.data,amount:newDiscountedPrice*100};
      // console.log(purchaseData);
      initPayment(result.data);
      }
      if (result.error) {
        toast.error(result.error.data.error, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if(couponCode === ""){
      toast.error('Please enter a coupon code',{
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    try {
      let result;
      const credentials={
        courseId:product?._id,
        couponCodeName:couponCode
      }
      result = await applyCouponCodeMutation(credentials);
      console.log(result.data);
      if(result.data){
        setNewDiscountedPrice(result.data);
        setCouponApplied(true);
      }else{
        toast.error(result?.error?.data,{
          position: "top-center",
          autoClose: 3000,
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleRemoveCoupon = async (e) => {
    e.preventDefault();
    setCouponApplied(false);
    setCouponCode("");
    setNewDiscountedPrice(product?.discountedPrice);
  }
  const setClose = () => {
    setVerifyPaymentDialog(false);
  }
  useEffect(() => {
    if(course){
      setProduct(course);
      setNewDiscountedPrice(course?.discountedPrice);
    }
    if(testSeries){
      setProduct(testSeries);
      setNewDiscountedPrice(testSeries?.discountedPrice);
    }
  }, [course,testSeries]);
  
  return (
    <div className="mx-4 mt-12 mb-4">
      <div className="your-order mb-12 lg:w-1/2 mx-auto">
        {(isLoading || testSeriesLoading) && <Loader />}
        {(isError && testSeriesError) && (
          <ErrorComponent
            onRetry={() => {
              navigate("/courses");
            }}
          />
        )}
        {/* {orderLoading && (
          <LoadingOverlay
            open={orderLoading}
            message="Processing your request, please do not close this window or press back while we confirm your payment"
          />
        )} */}
        {verifyPaymentDialog && <PaymentStatus open={verifyPaymentDialog} courseId={course?._id} testSeriesId={testSeries?._id} setClose={setClose} />}
        {product && <div sx={{ marginBottom: 2 }}>
          <Typography variant="h3" gutterBottom>
            Order Summary
          </Typography>
          <div style={{ marginBottom: '1rem' }}>
            {/* <img src={course?.imageURI} alt={course?.name} style={{ width: '150px', marginRight: 2 }} /> */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
              <Typography fontWeight='bold' fontSize='1rem'>{product?.title}</Typography>
              <Typography width='80px' fontSize='1rem' textAlign='right' fontWeight='bold' color="textSecondary">{`Rs. ${product?.discountedPrice}`}</Typography>
            </div>
          </div>
          <Divider sx={{ marginY: 2 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 1rem' }}>
            <Typography variant="body1" fontSize='1rem' fontWeight='bold' width='60%'>Taxes <span style={{fontWeight:'500', fontSize:'0.8rem'}}>(if applicable)</span></Typography>
            <Typography fontSize='1rem' width='80px' textAlign='right' fontWeight='bold' color="textSecondary">Rs. 0</Typography>
          </div>
          <Divider sx={{ marginY: 2 }} />
          <div style={{ display: 'flex',padding:'1px 0',width:lgUp?'60%':'90%',marginTop:'5px',position:'relative', alignItems: 'center', marginBottom: '1rem', border: '1px solid #4B4B4D21', borderRadius: '8px' }}>
            <input type="text" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} placeholder="Coupon Code" style={{outline:'none',fontSize:'1rem',width:'50%',textAlign:'center',padding:'10px',background:'transparent'}} />
            <div className="absolute w-1/2 right-0">
              {!couponApplied?<>{!couponCodeLoading ? <GradientButton onClick={handleApplyCoupon} text={lgUp?"Apply Coupon":"Apply"} />
              :<LoadingButton message='Processing...' />}</>
              :
              <div className="relative text-center">
                <IconX size={20} onClick={handleRemoveCoupon} style={{padding:'2px',position:'absolute',right:'0',cursor:'pointer'}} />
                <Typography variant="body1" color='green' border='1px dashed #4B4B4D' fontSize='1rem' mx='auto' bgcolor='#4B4B4D21' padding= '11px 28px' fontWeight='bold'>Applied</Typography>
              </div>}
              
            </div>
          </div>
          <Divider sx={{ marginY: 2 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 1rem' }}>
            <Typography variant="body1" fontSize='1rem' fontWeight='bold' width='60%'>Order Total</Typography>
            <Typography fontSize='1rem' width='80px' textAlign='right' fontWeight='bold' color="textSecondary">Rs. {newDiscountedPrice}</Typography>
          </div>

          <div sx={{ textAlign: 'center' }}>
            {!(orderLoading || testSeriesOrderLoading) ? <GradientButton
              text="Place order"
              disable={orderLoading || testSeriesOrderLoading}
              type="button"
              onClick={handlePayment}
            />
              : <LoadingButton message={lgUp?'Processing payment please wait...':"Processing payment..."} />}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Checkout;
