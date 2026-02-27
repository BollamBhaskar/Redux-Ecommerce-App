
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { incrementQty, decrementQty } from '../Slices/CartSlice'
import "./CartUi3D.css"

function CartUi() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state)=>state.cart.cart)

  function Handleback(){
    navigate("/")
  }

  function handleIncrease(id){
    dispatch(incrementQty(id))
  }

  function handleDecrease(id){
    dispatch(decrementQty(id))
  }

  return (
    <div className="cart-container">

      <h1 className="cart-title">Your Cart 🛒</h1>

      {cart.length === 0 && (
        <h2 className="empty-text">Cart is Empty</h2>
      )}

      {cart.map((item)=>(
        <div className="cart-card" key={item.id}>
          
          <img
            src={item.thumbnail || (item.images && item.images[0])}
            alt=""
            className="cart-image"
          />

          <div className="cart-info">
            <h2>{item.title}</h2>

            <div className="qty-control">
              <button onClick={()=>handleDecrease(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={()=>handleIncrease(item.id)}>+</button>
            </div>
          </div>

          <button className="back-btn" onClick={Handleback}>
            Back
          </button>

        </div>
      ))}

    </div>
  )
}

export default CartUi