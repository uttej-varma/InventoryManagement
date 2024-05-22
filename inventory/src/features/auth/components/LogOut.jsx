import { useEffect } from "react";
import { userSignOutAsync,selectLoggedInUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function LogOut(){
    const dispatch=useDispatch();
    const user=useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(userSignOutAsync())
    },[])
    //useEffect runs after render so add a condition
    return(
        <>
        {!user && <Navigate to='/login' replace={true}></Navigate>}
        
        </>
    )
}