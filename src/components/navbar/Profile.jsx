import React, { useState } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  useMediaQuery
} from '@mui/material';
import * as dropdownData from './data';
import { IconChevronDown, IconExclamationMark, IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';
import ProfileImg from '../../assets/images/profile/user-1.jpg';
import unlimitedImg from '../../assets/images/backgrounds/unlimited-bg.png';
import Scrollbar from './Scrollbar';
import { useDispatch } from 'react-redux';
import { setAuthState, setLogoutPopUp, setRedirectLocation, userLogout } from '../../store/slices/authSlice';
import { useAuth } from '../../hooks/hooks';
import GradientButton from '../form/GradientButton';
import ConfirmationPopup from '../molecules/ConfirmationPopup';
import { toast } from 'react-toastify';
import { setWishlist } from '../../store/slices/courseSlice';
import { Bell } from '@phosphor-icons/react';
import { Dot } from '@phosphor-icons/react/dist/ssr';
// import { setShowToast } from '../../redux/slices/alertSlice';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const {user,logoutPopup}=useAuth();
  const navigate=useNavigate();
  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const dispatch = useDispatch();
  const handleProfileComplete = () => {
    if(user.profileComplete && user.emailVerified){
      return;
    }
    dispatch(setAuthState(7));
  }
  const handleLogout =(e) => {
    dispatch(setRedirectLocation(window.location.pathname));
    dispatch(userLogout());
    dispatch(setWishlist());
    dispatch(setLogoutPopUp(false));
    navigate('/');
    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  const {pathname}=useLocation();
  // const isSingle = useSelector(state => state.singleLogin.isAuth);
  const lgUp=useMediaQuery(theme=>theme.breakpoints.up('lg'));

  return (
   <>
    {logoutPopup && (
      <ConfirmationPopup
        heading="Confirm Logout"
        message="Are you sure you want to logout?"
        acceptButton="Logout"
        onAccept={handleLogout}
        onCancel={() => dispatch(setLogoutPopUp(false))}
      />
    )}
    <Box display='flex' alignItems='center'>
    <div style={{marginRight:lgUp?'2rem':'2px',position:'relative',cursor:'pointer'}}>
        <Bell size={24} color='black' />
        <Dot size={50} color='red' style={{fontSize:'10px',position:'absolute',bottom:'-5px',left:'-8px'}} />
        </div>
       <IconButton
        size='large'
        aria-label='show 11 new notifications'
        color='inherit'
        aria-controls='msgs-menu'
        aria-haspopup='true'
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main'
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35
          }}
        />
        <Typography sx={{fontWeight:'600',px:'8px'}}>{user.personalInformation.fullName.split(" ")[0]}</Typography><IconChevronDown color='#4B4B4D'  size={16} />
        {!(user.profileComplete && user.emailVerified)&& <IconExclamationMark color='orange' style={{position:'absolute',top:'8px',left:'5px'}} stroke={2.5} />}
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id='msgs-menu'
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px'
          }
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant='h5'>User Profile</Typography>
            <Stack direction='row' py={3} spacing={2} alignItems='center'>
              <Avatar
                src={ProfileImg}
                alt={ProfileImg}
                sx={{ width: 95, height: 95 }}
              />
              {(user?.profileComplete && user?.emailVerified)?<Box>
                <Typography
                  variant='subtitle2'
                  color='textPrimary'
                  fontWeight={600}
                >
                  {user.personalInformation.fullName}
                </Typography>
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  display='flex'
                  alignItems='center'
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {user.email}
                </Typography>
              </Box>
              :<p onClick={handleProfileComplete} style={{color:'white',fontWeight: 'bold',borderRadius:'8px',padding:'4px 8px',backgroundColor:'#31d64d',marginBottom:'2rem', textAlign: 'center', marginTop: '1rem', cursor: 'pointer', textDecoration:'underline' }}>Complete Your Profile</p>}
            </Stack>
            <Divider />
            {dropdownData.profile.map(profile => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className='hover-text-primary'>
                  <Link to={user.profileComplete && user.emailVerified?profile.href:pathname} onClick={handleProfileComplete}>
                    <Stack direction='row' spacing={2}>
                      <Box
                        width='45px'
                        height='45px'
                        bgcolor='primary.light'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant='subtitle2'
                          fontWeight={600}
                          color='textPrimary'
                          className='text-hover'
                          noWrap
                          sx={{
                            width: '240px'
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color='textSecondary'
                          variant='subtitle2'
                          sx={{
                            width: '240px'
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Button
                onClick={()=>dispatch(setLogoutPopUp(true))}
                variant='outlined'
                color='primary'
                component={Link}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box></>
  );
};

export default Profile;
