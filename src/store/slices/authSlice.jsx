import { createSlice } from "@reduxjs/toolkit"



const initialState={
    isAuth:false,
    authState:0,
    token:undefined,
    phone:undefined,
    email:undefined,
    user:undefined,
    isLoading:false,
    redirectLocation:"/",
    profileTab:1,
    logoutPopup:false
}

//AUTH_STATES:
// authState==0 --> no auth action yet.
// authState==1 --> login - mobile number input page
// authState==2 --> login - mobile otp verification page
// authState==3 --> login - email input page
// authState==4 --> login - email otp verification page
// authState==5 --> enroll now- mobile number input page
// authState==6 --> enroll now- mobile otp verification page
// authState==7 --> enroll now- complet your profile including email
// authState==8 --> enroll now- email otp verification page
// authState==9 --> 
// authState==10 --> User authentication complete



const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLogout:(state)=>{
            state.isAuth=false;
            state.authState=0;
            state.user=undefined;
            state.token=undefined;
            state.phone=undefined;
            state.email=undefined;
            state.isLoading=false;
        },
        setRedirectLocation:(state,action)=>{
            state.redirectLocation=action.payload;
        },
        setPhoneNumber:(state,action)=>{
            state.phone=action.payload;
        },
        setEmail:(state,action)=>{
            state.email=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setAuthState:(state,action)=>{
            state.authState=action.payload;
        },
        setLogoutPopUp:(state,action)=>{
            state.logoutPopup=action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        },
        setAuthenticated:(state,action)=>{
            state.isAuth=true;
            state.token=action.payload;
        },
        setProfileTab:(state,action)=>{
            state.profileTab=action.payload;
        },
        userLoginRetry:(state,action)=>{
            state.authState=action.payload;
            state.isLoading=false;
        }
    },
});

export const {userLoginRetry,setAuthState,setLogoutPopUp,setProfileTab,setUser,setEmail,setAuthenticated,setPhoneNumber,userLogout,setRedirectLocation,setLoading}=authSlice.actions;
export const selectAuth=(state)=>state.auth;
export default authSlice.reducer;