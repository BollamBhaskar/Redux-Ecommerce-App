
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import "./Checkout3D.css"; 

function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    if (!name || !address) {
      toast.error("Fill all fields");
      return;
    }

    toast.success(`Order Placed Successfully 🎉
Name: ${name}
Payment: ${paymentMethod}
Total: $${totalAmount.toFixed(2)}`);

   
    navigate("/");
  };

  return (
    <div className="checkout-container">
    
      <Toaster position="top-right" reverseOrder={false} />

      <h1>Checkout Page 🧾</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <h3>{item.title}</h3>
                <img  style={{width:100,height:100}}src={item.images} alt=""></img>
                <p>
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
            ))}
          </div>

          <h2 className="checkout-total">Total: ${totalAmount.toFixed(2)}</h2>

          <div className="checkout-form">
            <label>
              Name:
              <input
                type="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Address:
              <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label>
              Payment Method:
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash">Cash on Delivery</option>
                <option value="Card">Credit/Debit Card</option>
              </select>
            </label>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;