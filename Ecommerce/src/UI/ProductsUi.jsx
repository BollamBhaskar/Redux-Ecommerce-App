
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Slices/ProductsSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Slices/CartSlice";
import { addToWishList } from "../Slices/WishlistSlice";
import { logout } from "../Slices/AuthSlice.js"; 
import { CiHeart } from "react-icons/ci";
import { Toaster, toast } from "react-hot-toast";
import "./ProductsUi3D.css";

function ProductsUi() {
  var dispatch = useDispatch();
  var navigate = useNavigate();

  var { products, loading, error } = useSelector((state) => state.products);
  var cart = useSelector((state) => state.cart.cart);
  var user = useSelector((state) => state.auth.user);

  var [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 
  var handleCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
  };

 
  var handleWishList = (product) => {
    dispatch(addToWishList(product));
    toast.success(`${product.title} added to wishlist`);
  };


  var handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  
  var filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <Toaster />

    
      <div className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Discover The Future of Shopping</h1>
          <p className="hero-subtitle">
            Premium Quality • Modern Design • Best Prices
          </p>
          <button
            className="hero-btn"
            onClick={() =>
              window.scrollTo({ top: 500, behavior: "smooth" })
            }
          >
            Explore Now
          </button>
        </div>
        <div className="hero-shape shape-one"></div>
        <div className="hero-shape shape-two"></div>
        <div className="hero-shape shape-three"></div>
      </div>

 
      <div className="products-header">
        <h1 className="logo">BJG STORE</h1>
        <div id="search">
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          </div>
        <div className="nav-buttons">
        
          
          <button onClick={() => navigate("/cart")}>Cart ({cart.length})</button>
          <button onClick={() => navigate("/wishlist")}>Wishlist</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

     
      {loading && <h2 className="status-text">Loading Products...</h2>}
      {error && <h2 className="error-text">{error}</h2>}
      {!loading && filteredProducts.length === 0 && (
        <h2 className="status-text">No products found</h2>
      )}

 
      <div className="products-grid">
        {filteredProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="img-wrapper">
              <img
                src={item.thumbnail || (item.images && item.images[0])}
                alt={item.title}
              />
            </div>
            <h3>{item.title}</h3>
            <div className="card-actions">
              <button className="cart-btn" onClick={() => handleCart(item)}>
                Add To Cart
              </button>
              <button className="wish-btn" onClick={() => handleWishList(item)}>
                <CiHeart size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsUi;
