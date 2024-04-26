import { createSlice } from "@reduxjs/toolkit";



const initialState={
    allCourses:undefined,
    allTestSeries:undefined,
    searchedCourses:undefined,
    searchedTestSeries:undefined,
    filteredCourses:undefined,
    categoryIds:[],
    wishList:[]
}

const courseSlice=createSlice({
    name:'course',
    initialState,
    reducers:{
        setCourses:(state,action)=>{
            state.allCourses=action.payload;
        },
        setTestSeries:(state,action)=>{
            state.allTestSeries=action.payload;
        },
        setFilteredCourses:(state,action)=>{
            state.filteredCourses=action.payload;
        },
        setSearchedCourses:(state,action)=>{
            state.searchedCourses=action.payload;
        },
        setSearchedTestSeries:(state,action)=>{
            state.searchedTestSeries=action.payload;
        },
        addCategoryId:(state,action)=>{
            state.categoryIds.push(action.payload);
        },
        addToWishlist:(state,action)=>{
            state.wishList.push(action.payload);
        },
        setWishlist:(state,action)=>{
            state.wishList=action.payload;
        },
        removeFromWishlist:(state,action)=>{
            let index=state.wishList.indexOf(action.payload);
            if(index!==-1){
                state.wishList.splice(index,1);
            }
        },
        flushFilters:(state)=>{
            state.categoryIds=[];
            state.filteredCourses=undefined;
        },
        removeCategoryId:(state,action)=>{
            let index=state.categoryIds.indexOf(action.payload);
            if(index!==-1){
                state.categoryIds.splice(index,1);
            }
        },
    },
});

export const {setCourses,setSearchedCourses,setSearchedTestSeries,setWishlist,addToWishlist,removeFromWishlist,setTestSeries,setFilteredCourses,addCategoryId,flushFilters,removeCategoryId}=courseSlice.actions;
export const selectCourse=(state)=>state.course;
export default courseSlice.reducer;