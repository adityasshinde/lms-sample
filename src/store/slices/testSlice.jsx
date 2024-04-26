import { createSlice } from "@reduxjs/toolkit";



const initialState={
    questions:undefined,
    sections:undefined,
    responses:[],
    activeQuestion:undefined,
}

const testSlice=createSlice({
    name:'test',
    initialState,
    reducers:{
        setQuestions:(state,action)=>{
            state.questions=action.payload;
        },
        setSections:(state,action)=>{
            state.sections=action.payload;
        },
        setResponse:(state,action)=>{
            const index=state.responses.findIndex(response=>response._id===action.payload?._id);
            if(index!==-1){
                state.responses[index]=action.payload;
            }else{  
                state.responses.push(action.payload);
            } 
        },
        addResponse:(state,action)=>{
            state.responses.push(action.payload);
        },
        deleteResponse:(state,action)=>{
            const index=state.responses.findIndex(response=>response.questionId===action.payload);
            state.responses[index].status='VISITED';
        },
        setStatusOfQuestion:(state,action)=>{
            const index=state.responses.findIndex(response=>response.questionId===action.payload.questionId);
            state.responses[index].status=action.payload;
        },
        setActiveQuestion:(state,action)=>{
            state.activeQuestion=action.payload;
        },
        flushTest:(state)=>{
            state.questions=undefined;
            state.sections=undefined;
            state.responses=[];
            state.activeQuestion=undefined;
        }
    },
});

export const {setQuestions,setResponse,setSections,setActiveQuestion,addResponse,deleteResponse,setStatusOfQuestion,flushTest}=testSlice.actions;
export const selectTest=(state)=>state.test;
export default testSlice.reducer;