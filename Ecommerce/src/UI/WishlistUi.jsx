
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import "./Wishlist3D.css"

function WishlistUi(){

  var wishlist = useSelector((state)=>state.wishlist.wishlist)
  var navigate = useNavigate()

  function handleBack(){
    if(wishlist.length !== 0){
      toast.success("Back To Products Page")
    }
    navigate("/")
  }

  return (
    <div className="wishlist-container">

      <h1 className="wishlist-title">My Wishlist ❤️</h1>

      {wishlist.length === 0 && (
        <h2 className="empty-text">Wishlist is Empty</h2>
      )}

      <div className="wishlist-grid">
        {wishlist.map((item)=>(
          <div className="wishlist-card" key={item.id}>

            <div className="img-box">
              <img  src={item.thumbnail || (item.images && item.images[0])} alt={item.title}/>
            </div>

            <h3>{item.title}</h3>

            <button className="back-btn" onClick={handleBack}>
              Back to Products
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}



export default WishlistUi





