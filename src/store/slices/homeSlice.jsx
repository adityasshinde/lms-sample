import { createSlice } from "@reduxjs/toolkit";



const initialState={
    categories:undefined,
    subjects:undefined,
    instructors:undefined,
}

const homeSlice=createSlice({
    name:'home',
    initialState,
    reducers:{
        setCategories:(state,action)=>{
            state.categories=action.payload;
        },
        setSubjects:(state,action)=>{
            state.subjects=action.payload;
        },
        setInstructors:(state,action)=>{
            state.instructors=action.payload;
        }
    },
});

export const {setCategories,setSubjects,setInstructors}=homeSlice.actions;
export const selectHome=(state)=>state.home;
export default homeSlice.reducer;