import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProductUi from "./UI/ProductsUi";
import CartUi from "./UI/CartUi"
import WishlistUi from "./UI/WishlistUi";
import AuthUi from "./UI/AuthUi";
import ProfileUi from "./UI/ProfileUi";
import Checkout from "./UI/CheckoutUi";



function App()
{
  return(
    <div>
      <BrowserRouter>
      <Routes>
         <Route path="/" element = {<AuthUi/>}/>
        <Route path="/products" element={<ProductUi/>}/>
        <Route path="/Cart" element={<CartUi/>}/>
        <Route path="/Wishlist" element={<WishlistUi/>}/>
         <Route path="/profile" element = {<ProfileUi/>}/>
          <Route path="/checkout" element = {<Checkout/>}/>
         
   
          
     
      </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App 









