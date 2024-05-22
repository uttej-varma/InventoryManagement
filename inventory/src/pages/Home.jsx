import Navbar from "../features/nav-bar/Navbar"
import ProductList from "../features/productList/ProductList";
import Footer from "../features/commonComponents/Footer";
import ErrorFallback from "../features/commonComponents/errorFallback";
import { ErrorBoundary } from "react-error-boundary";
export default function Home(){
    return(
      <>
        <ErrorBoundary fallback={ErrorFallback}>
         <Navbar>
          <ProductList></ProductList>
         </Navbar>
         <Footer></Footer>
         </ErrorBoundary> 
      </>
    )
  }
  
 