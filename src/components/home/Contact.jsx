import React, { useState } from 'react';
import { Grid, Button, Typography, Card, CardContent, TextField } from '@mui/material';
import GradientButton from '../form/GradientButton';
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconMail, IconMapPin, IconPhone } from '@tabler/icons';
import { toast } from 'react-toastify';
import { useSendMessageMutation } from '../../store/api/homeApi';
import LoadingButton from '../form/LoadingButton';
import WithScrollAnimation from './WithScrollAnimation';



const Contact = () => {
     const [sendMessage,{isLoading,isError}]=useSendMessageMutation();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });
    const formChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault();

        //email regex validation
        const isEmailValid = (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(form.email);
        //full name regex validation
        //should contain atleast three characters
        const isNameValid = form.fullName.trim().length > 2 && (/^[a-zA-Z\s]+$/).test(form.fullName);
        //subject regex validation
        const isSubjectValid = form.subject.trim().length > 0;
        //message regex validation
        const isMessageValid = form.message.trim().length > 0;
        if (!isEmailValid) {
            toast.error('Invalid Email',
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            return;
        }
        if (!isNameValid) {
            toast.error('Invalid Full Name',
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            return;
        }
        if (!isSubjectValid) {
            toast.error('Invalid Subject',
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            return; 
        }
        if (!isMessageValid) {
            toast.error('Invalid Message',
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            return;
        }
        //if all fields are valid
        const result=await sendMessage(form);
        console.log(result);
        if(result.error){
            toast.error(result.error.data.message,
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            return;
        }
        if(result.data){
            toast.success('Message Sent Successfully',
                {
                    position: "top-center",
                    autoClose: 3000,
                });
            setForm({
                fullName: '',
                email: '',
                subject: '',
                message: ''
            });
        }
    }
    return (
      <WithScrollAnimation>
          <div style={{ width: '100%', marginBottom: '4rem' }} id='contact'>
            <Grid container direction="column" position='relative' alignItems="center" spacing={2} sx={{ px: { xs: '5vw', md: '10vw' } }}>
                {/* First Child */}
                <Grid item alignContent='center' sm={3}>
                    <Typography variant="body1" fontWeight={900} sx={{ color: '#2B527A', textAlign: 'center', letterSpacing: '2px'}}>
                        CONTACT
                    </Typography>
                    <Typography fontWeight={800} variant="h2" sx={{ color: '#4B4B4D', textAlign: 'center' }}>
                        Let's <Typography variant="h2" component="span" fontWeight={800} sx={{ color: 'primary.main' }}>connect</Typography>, keep in touch!
                    </Typography>
                </Grid>

                {/* Second Child */}
                <Grid item container justifyContent="left" mt='3rem' mb='1rem' sm={3} >
                    <Card sx={{ pr:'10%',width: { xs: '100%', md: '60%' }, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
                        <CardContent sx={{ padding: '20px' }}>
                            <Typography sx={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.3rem', color: '#4B4B4D' }}>Send A Message</Typography>
                            <Typography sx={{ fontSize: '0.8rem', color: '#4B4B4D' }}>
                                Easily send messages for inquiries, feedback, or support. We're here to help you!
                            </Typography>

                            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                                <Grid item xs={12}>
                                    <TextField fullWidth onChange={formChangeHandler} name='fullName' value={form.fullName} placeholder="Full Name" variant="outlined" sx={{ "::placeholder": { color: '#4B4B4D' } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth onChange={formChangeHandler} name='email' value={form.email} placeholder="Mail Address" variant="outlined" sx={{ "::placeholder": { color: '#4B4B4D' } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth onChange={formChangeHandler} name='subject' value={form.subject} placeholder="Subject" variant="outlined" sx={{ "::placeholder": { color: '#4B4B4D' } }} />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                         onChange={formChangeHandler}
                                        name='message'
                                        value={form.message}
                                        placeholder="Message"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        sx={{ "::placeholder": { color: '#4B4B4D'}}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                   {isLoading ? <LoadingButton message='Sending message...' />
                                   :<GradientButton
                                        text='Submit'
                                        type='submit'
                                        onClick={onSubmitHandler}
                                    />}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Card sx={{ position:{xs:'relative',md:'absolute'},bottom:'-2rem', right: { xs: '0', md: '9%' },width: { xs: '100%', md: '40%' },borderRadius: '0px 11px 11px 0px', backgroundColor: '#4B4B4D', color: 'white' }}>
                    <CardContent>
                    <Typography sx={{ fontWeight: 'bold', marginBottom: '2rem', fontSize: '1.5rem', color: 'white' }}>Contact Us</Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center',my:'1rem'}}>
                                <IconMapPin color="#207EB8" size={32} className='mr-4' stroke={2} />
                                <div>
                                <Typography sx={{fontSize:'1.2rem',color: 'white' }}>Delhi</Typography>
                                <Typography sx={{fontSize:'1rem',color: 'white' }}>8502 Preston Rd. Inglewood, Maine 98380</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center',my:'1rem' }}>
                                <IconPhone color="#207EB8" size={32} className='mr-4' stroke={2}/>
                                <Typography sx={{fontSize:'1.2rem',color: 'white' }}>+91 999 999 9999</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center',my:'1rem' }}>
                                <IconMail color="#207EB8" size={32} className='mr-4'  stroke={2}/>
                                <Typography sx={{fontSize:'1.2rem',color: 'white' }}>support@taksh.com</Typography>
                            </Grid>
                        </Grid>
                        <div className='w-full my-4 flex items-center justify-end'>
                            <IconBrandLinkedin stroke={1.5} size={20} style={{margin:'0 0.5rem',cursor:'pointer'}} />
                            <IconBrandInstagram stroke={1.5} size={20} style={{margin:'0 0.5rem',cursor:'pointer'}} />
                            <IconBrandFacebook stroke={1.5} size={20} style={{margin:'0 0.5rem',cursor:'pointer'}} />
                            <IconBrandTwitter stroke={1.5} size={20} style={{margin:'0 0.5rem',cursor:'pointer'}} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </div>
      </WithScrollAnimation>
    );
}

export default Contact;