
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { incrementQty, decrementQty } from '../Slices/CartSlice'
import "./CartUi3D.css"

function CartUi() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)


  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

 
  function handleBack() {
    toast.success("Back to Home Page")
    navigate("/")
  }


  function handleIncrease(id) {
    dispatch(incrementQty(id))
  }


  function handleDecrease(id) {
    dispatch(decrementQty(id))
  }


  function handleCheckout() {
    if (cart.length === 0) {
      toast.error("Your cart is empty!")
      return
    }

    navigate("/checkout")
  }

  return (
    <div className="cart-container">

      <h1 className="cart-title">Your Cart 🛒</h1>

  
      {cart.length === 0 && (
        <h2 className="empty-text">Cart is Empty</h2>
      )}

   
      {cart.map((item) => (
        <div className="cart-card" key={item.id}>

          <img
            src={item.thumbnail || (item.images && item.images[0])}
            alt={item.title}
            className="cart-image"
          />

          <div className="cart-info">
            <h2>{item.title}</h2>
            <p className="price">${item.price}</p>

            <div className="qty-control">
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrease(item.id)}>+</button>
            </div>
          </div>

          <button className="back-btn" onClick={handleBack}>
            Back
          </button>

        </div>
      ))}

    
      {cart.length > 0 && (
        <div className="checkout-section">
          <h2>Total: ${totalAmount.toFixed(2)}</h2>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}

    </div>
  )
}

export default CartUi