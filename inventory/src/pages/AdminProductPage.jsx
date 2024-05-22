import Navbar from "../features/nav-bar/Navbar";
import { ProductForm } from "../features/admin/components/ProductForm";
export default function AdminProductForm(){
  return(
    <>
       <Navbar>
        <ProductForm></ProductForm>
       </Navbar>
    </>
  )
}