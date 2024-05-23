import Navbar from "../features/nav-bar/Navbar"
import ProductList from "../features/productList/ProductList";
import Footer from "../features/commonComponents/Footer";
export default function Home(){
    return(
      <>
       
         <Navbar>
          <ProductList></ProductList>
         </Navbar>
         <Footer></Footer>
         
      </>
    )
  }
  
 