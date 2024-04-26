import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import GradientButton from '../form/GradientButton';
import { useFetchOrderStatusQuery } from '../../store/api/paymentApi';
import { usePayment } from '../../hooks/hooks';
import GradientLink from '../form/GradientLink';
import { useGetStudentProfileMutation } from '../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';

function PaymentConfirmationPage() {
    const { orderId } = usePayment();
    console.log(orderId);
    const dispatch = useDispatch();
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
    }, [isLoading, paymentStatus]);
    console.log(paymentStatus);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ maxWidth: 400 }}>
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Payment Confirmation
                    </Typography>
                    {(paymentStatus === 'pending' || isLoading) && (
                        <div style={{ marginBottom: 20 }}>
                            <CircularProgress />
                            <Typography variant="body1" style={{ marginTop: 10 }}>
                                Payment Confirmation Pending...
                            </Typography>
                        </div>
                    )}

                    {paymentStatus === 'success' && (
                        <Typography variant="body1" style={{ marginBottom: 20 }}>
                            Course purchased successfully!
                        </Typography>
                    )}
                    {paymentStatus === 'failed' && (
                        <Typography variant="body1" style={{ marginBottom: 20 }}>
                            Course purchase failed.
                        </Typography>
                    )}
                    <GradientLink
                        text='Continue Learning'
                        to='/courses'
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default PaymentConfirmationPage;
