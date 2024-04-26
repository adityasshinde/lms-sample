import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { usePayment } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { useFetchOrderStatusQuery } from '../../store/api/paymentApi';
import { useGetStudentProfileMutation } from '../../store/api/authApi';
import { setUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import PaymentResponse from './PaymentResponse';

function PaymentStatus({ open, setClose,courseId,testSeriesId}) {
    const { orderId } = usePayment();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: paymentStatus, isLoading, refetch } = useFetchOrderStatusQuery(orderId);
    const [getStudentProfileMutation] = useGetStudentProfileMutation();

    const updateUser = async () => {
        console.log(paymentStatus);
        const student = await getStudentProfileMutation();
        if (student.data) {
            dispatch(setUser(student.data));
        }
    }
    useEffect(() => {
        console.log(paymentStatus);
        if (paymentStatus !== 'success' && paymentStatus !== 'failed' && !isLoading) {
            refetch();
        } else {
            updateUser();
        }
        if(paymentStatus==='success'){
            setTimeout(() => {
            setClose();
            if(courseId){
                navigate(`/lms/my_courses/${courseId}`);
            }
            if(testSeriesId){
                navigate(`/lms/my_test_series/${testSeriesId}`);
            }
            }, 2000);
        }
    }, [isLoading, paymentStatus]);
    return (
        <Dialog
            open={open}
            aria-labelledby="payment-verification-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
        >
            <DialogContent>
                <div style={{ textAlign: 'center',display:'flex',alignItems:'center',justifyContent:'center',width:'300px',height:'300px'}}>
                    <PaymentResponse type={isLoading?"pending":paymentStatus} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PaymentStatus;
