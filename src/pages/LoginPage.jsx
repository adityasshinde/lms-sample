import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import AuthImage from "../asset/images/auth-image.png";
import LogoCircle from "../asset/images/logo-circle.png";
import CompleteProfile from "../components/auth/CompleteProfile";
import SendOtpForm from "../components/auth/SendOtpForm";
import VerifyOtpForm from "../components/auth/VerifyOtpForm";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuth } from "../hooks/hooks";
import { setAuthState } from "../store/slices/authSlice";
import { Typography, Grid, Button, IconButton } from "@mui/material";
import { IconX } from "@tabler/icons";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { isLoading, isAuth, authState } = useAuth();
  const dispatch = useDispatch();

  return (
    <Grid container justifyContent="center" padding='2rem' borderRadius='21px' position='relative' alignItems="center" bgcolor='white' height='auto' width={{ xs: '90%', sm: '80%', md: '70%', lg: '60%' }} >
      {isLoading && authState<9 && authState!==7 && authState % 2 === 1 && (
        <LoadingOverlay message="Sending OTP, please wait...." />
      )}
      {isLoading && authState<9 && authState % 2 === 0 && (
        <LoadingOverlay message="Verifying OTP, please wait...." />
      )}
      {isLoading && authState===7 && (
        <LoadingOverlay message="Updating your profile, please wait...." />
      )}

      <Grid height='100%' pt={{xs:'3rem',md:'0'}} display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
        <Grid container flexDirection='column' justifyContent="center" alignItems="center" mb={4}>
          <img src={LogoCircle} alt="Logo Circle" style={{ position: 'absolute', top: '4%', left: '4%', height: '3rem', width: '3rem' }} />
          <Typography variant="h2">
            Welcome to <span style={{ color: '#0074BA' }}>Taksh</span>
          </Typography>
          <Typography sx={{ width:{xs:'100%', md:'60%',lg:'50%'},fontSize:'1rem'}} textAlign='center'>
            Unlock knowledge! Sign up for exclusive access to resources and personalized learning!
          </Typography>
          <IconX size="1.4rem" color="black" onClick={()=>{dispatch(setAuthState(0))}} style={{cursor:'pointer', position: 'absolute', top: '5%', right: '5%' }} />
        </Grid>
        <Grid container width='auto' height='auto' spacing={4} margin='0 0.5rem'>
          <Grid item xs={12} md={5} lg={6} margin='auto' height='auto' padding='0 !important'>
            <img src={AuthImage} alt="Authentication" style={{width:'auto'}} />
          </Grid>
          <Grid item xs={12} md={7} lg={6} padding='0 !important'>
            <div className="p-2 md:p-6" style={{ border: '1px solid #e5e5e5', borderRadius: '11px' }}>
              <form id="auth" style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
                {(authState === 1 || authState === 3) && (
                  <Typography style={{ color: '#4B4B4D',fontSize:'1.6rem', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Log-in
                  </Typography>
                )}
                {(authState === 5) && (
                  <Typography style={{ color: '#4B4B4D',fontSize:'1.6rem', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
                    Sign-up
                  </Typography>
                )}
                {authState < 9 && authState!==7 && (authState % 2 === 1 ? <SendOtpForm /> : <VerifyOtpForm />)}
                {authState === 7 && <CompleteProfile />}
                {authState === 1 && (
                  <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1">
                      <span style={{ color: '#4B4B4D', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { dispatch(dispatch(setAuthState(3))); }}>
                        Login with email
                      </span>
                    </Typography>
                  </div>
                )}
                {authState === 3 && (
                  <div style={{ textAlign: 'center' }}>
                    <Typography variant="body1">
                      <span style={{ color: '#4B4B4D', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { dispatch(setAuthState(1)); }}>
                        Continue with mobile
                      </span>
                    </Typography>
                  </div>
                )}
                {(authState === 1 || authState === 3) && (
                  <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                    <Typography sx={{fontSize:'1rem'}}>
                      Don't have an account?{" "}
                      <span style={{ color: '#0074BA', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { dispatch(setAuthState(5)); }}>
                        Create Account
                      </span>
                    </Typography>
                  </div>
                )}
                {authState === 5 && (
                  <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                    <Typography sx={{fontSize:'1rem'}}>
                      Already Have an Account?{" "}
                      <span style={{ color: '#0074BA',fontWeight:'bold', cursor: 'pointer' }} onClick={() => { dispatch(setAuthState(1)); }}>
                        Login
                      </span>
                    </Typography>
                  </div>
                )}
              </form>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
