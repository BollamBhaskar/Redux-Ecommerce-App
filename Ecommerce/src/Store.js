import{configureStore} from "@reduxjs/toolkit"
import ProductsReducer from "./Slices/ProductsSlice"
import CartReducer from "./Slices/CartSlice"
import WishlistReducer from "./Slices/WishlistSlice"
import AuthReducer from "./Slices/AuthSlice"


var Store =configureStore({
    reducer :{
        products : ProductsReducer,
        cart : CartReducer,
        wishlist : WishlistReducer,
       auth : AuthReducer
       
       
    }
})
export default Store