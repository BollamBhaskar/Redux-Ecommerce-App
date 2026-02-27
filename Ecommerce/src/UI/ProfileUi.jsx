
import React from 'react'
import { useSelector } from "react-redux"
import "./ProfileUi3D.css"
function ProfileUi(){
  var user = useSelector((state) => state.auth.user)

  if (!user) {
    return (
      <div className="profile-container">
        <h1 className="login-warning">Please Login</h1>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-img-box">
          <img src={user.image} alt="profile" />
        </div>

        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  )
}

export default ProfileUi