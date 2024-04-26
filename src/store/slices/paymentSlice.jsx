import { createSlice } from "@reduxjs/toolkit";



const initialState={
    checkoutCourseId:undefined,
    billingFormStatus:undefined,
    billingFormData:undefined,
    formErrors:undefined,
    isFormValid:false,
    orderId:undefined,
}

const paymentSlice=createSlice({
    name:'payment',
    initialState,
    reducers:{
        setbillingFormStatus:(state,action)=>{
            state.billingFormStatus=action.payload;
        },
        setBillingFormData:(state,action)=>{
            state.billingFormData=action.payload;
        },
        setCheckoutCourseId:(state,action)=>{
            state.checkoutCourseId=action.payload;
        },
        setFormErrors:(state,action)=>{
            state.formErrors=action.payload;
        },
        setIsFormValid:(state,action)=>{
            state.isFormValid=action.payload;
        },
        setOrderId:(state,action)=>{
            state.orderId=action.payload;
        },
    },
});

export const {setCheckoutCourseId,setOrderId,setBillingFormData,setbillingFormStatus,setFormErrors,setIsFormValid}=paymentSlice.actions;
export const selectPayment=(state)=>state.payment;
export default paymentSlice.reducer;