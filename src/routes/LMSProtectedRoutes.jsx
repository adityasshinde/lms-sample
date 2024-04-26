import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { setAuthState, setUser, userLogout } from "../store/slices/authSlice";
import { useGetStudentProfileMutation, useVerifyTokenQuery } from "../store/api/authApi";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { setWishlist } from "../store/slices/courseSlice";
import LMSLayout from "../layouts/LMSLayout";
import PulseLoader from "../components/atoms/PulseLoader";



const LMSProtectedRoutes = () => {
    const { isAuth,token} = useAuth();
    const dispatch = useDispatch();
    const [getStudentProfileMutation] = useGetStudentProfileMutation();
    const { data, isLoading, isError} = useVerifyTokenQuery();
    const verifyToken = async () => {
        if (isError && token) {
            console.log("error", isError);
            dispatch(userLogout());
            dispatch(setWishlist());
            dispatch(setAuthState(1));
        }
        if (data && token) {
            const student = await getStudentProfileMutation();
            if (student.data) {
                dispatch(setUser(student.data));
            }
        };
    }
    useEffect(() => {
        if(token && !isError && !isLoading){
            verifyToken();
        }
        if(isError && !isLoading){
            console.log("error inside useeffect", isError);
            dispatch(userLogout());
            dispatch(setWishlist());
            dispatch(setAuthState(1));
        }
        if(!isAuth){
            console.log("not auth");
            dispatch(setAuthState(1));
        }
    }, [isAuth, isLoading, isError]);

    return <>
        {(isLoading) ? <LoadingOverlay />
            : <div>
                {isAuth ? <LMSLayout/>
                    : <Navigate to="/" />}
            </div>
        }
    </>
};



export default LMSProtectedRoutes;