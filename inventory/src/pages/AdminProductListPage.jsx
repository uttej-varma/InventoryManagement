import Navbar from "../features/nav-bar/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";
export default function AdminHome(){
  return(
    <>
       <Navbar>
        <AdminProductList></AdminProductList>
       </Navbar>
    </>
  )
}