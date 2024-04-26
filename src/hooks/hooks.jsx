import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/authSlice";
import { selectHome } from "../store/slices/homeSlice";
import { selectCourse } from "../store/slices/courseSlice";
import { selectPayment } from "../store/slices/paymentSlice";
import { selectCustomizer } from "../store/slices/customizerSlice";
import { selectLMS } from "../store/slices/lmsSlice";
import { selectTest } from "../store/slices/testSlice";




export const useAuth=()=>useSelector(selectAuth);

export const useCourse=()=>useSelector(selectCourse);

export const useHome=()=>useSelector(selectHome);

export const useCustomizer=()=>useSelector(selectCustomizer);

export const usePayment=()=>useSelector(selectPayment);

export const useLMS=()=>useSelector(selectLMS);

export const useTest=()=>useSelector(selectTest);