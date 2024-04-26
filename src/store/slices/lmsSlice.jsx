import { createSlice } from "@reduxjs/toolkit";



const initialState={
    lmscourse:undefined,
    lmsSubject:undefined,
    lmsLectures:undefined,
    lmsSidebarOpen:false,
}

const lmsSlice=createSlice({
    name:'lms',
    initialState,
    reducers:{
        setLmsCourse:(state,action)=>{
            state.lmscourse=action.payload;
        },
        setLmsSubject:(state,action)=>{
            state.lmsSubject=action.payload;
        },
        setLmsLectures:(state,action)=>{
            state.lmsLectures=action.payload;
        },
        setSidebar:(state,action)=>{
            state.lmsSidebarOpen=action.payload;
        },
    },
});

export const {setLmsCourse,setLmsLectures,setLmsSubject,setSidebar}=lmsSlice.actions;
export const selectLMS=(state)=>state.lms;
export default lmsSlice.reducer;