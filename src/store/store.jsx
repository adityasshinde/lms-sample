
import authReducer from './slices/authSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore, } from 'redux-persist';
import { authApi } from './api/authApi';
import homeReducer from './slices/homeSlice';
import customizerReducer from './slices/customizerSlice';
import courseReducer from './slices/courseSlice';
import paymentReducer from './slices/paymentSlice';
import lmsReducer from './slices/lmsSlice';
import testReducer from './slices/testSlice';
import { courseApi } from './api/courseApi';
import { homeApi } from './api/homeApi';
import {paymentApi} from './api/paymentApi'
import { lmsApi } from './api/lmsApi';


const persistConfig={
    key:'auth',
    storage
}
const persistConfigTest={
    key:'test',
    storage
}


const rootReducers=combineReducers({
    auth:persistReducer(persistConfig,authReducer),
    test:persistReducer(persistConfigTest,testReducer),
    lms:lmsReducer,
    home:homeReducer,
    customizer:customizerReducer,
    course:courseReducer,
    payment:paymentReducer,
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [homeApi.reducerPath]:homeApi.reducer,
    [paymentApi.reducerPath]:paymentApi.reducer,
    [lmsApi.reducerPath]:lmsApi.reducer,
});

export const store=configureStore({
    reducer:rootReducers,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(
        authApi.middleware,
        courseApi.middleware,
        homeApi.middleware,
        paymentApi.middleware,
        lmsApi.middleware,
    )
});

export const persistor=persistStore(store);