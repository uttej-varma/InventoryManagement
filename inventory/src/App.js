
import './App.css';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { PageNotFound } from './pages/404';
import ProductDetailsPage from './pages/ProductsDetailPage';
import AdminHome from './pages/AdminProductListPage';
import AdminProductForm from './pages/AdminProductPage';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import LogOut from './features/auth/components/LogOut';
import UserProfilePage from './pages/UserProfilePage';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Protected><Home></Home></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path:"/signup",
    element:<SignupPage></SignupPage>,
  },
  {
    path:'/productDetails/:id',
    element:<Protected><ProductDetailsPage></ProductDetailsPage></Protected>
  },
  {
    path:'/admin/productForm/edit/:id',
    element:<ProtectedAdmin><AdminProductForm></AdminProductForm></ProtectedAdmin>
  },
  {
    path:'/admin/productForm',
    element:<ProtectedAdmin><AdminProductForm></AdminProductForm></ProtectedAdmin>
  },
  {
    path:'/profile',
    element:<Protected><UserProfilePage></UserProfilePage></Protected>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  }
]);
function App() {
  const user=useSelector(selectLoggedInUser);
  const dispatch=useDispatch();
  const userChecked=useSelector(selectUserChecked);
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])
  useEffect(()=>{
    if(user){
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])
  return (
    <div>
      {
        userChecked &&
      <RouterProvider router={router} />
      }
     
    </div>
  );
}

export default App;
