import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { selectLoggedInUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";
export default function ProtectedAdmin({children}){
    const user=useSelector(selectLoggedInUser);
    const userInfo=useSelector(selectUserInfo)
    if(!user)
    {
       return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && userInfo.role!=='admin')
    {
       return <Navigate to='/' replace={true}></Navigate>
    }
    return children

}