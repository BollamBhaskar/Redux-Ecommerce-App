
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { loginApi } from '../Slices/AuthSlice'
import { useNavigate } from 'react-router'
import { Toaster, toast } from 'react-hot-toast'
import "./AuthUi3D.css"

function AuthUi(){

    var [username,setUsername] = useState("")
    var [password,setPassword] = useState("")
    var navigate = useNavigate()
    var {user,loading,error} = useSelector((state)=>state.auth)
    var dispatch = useDispatch()
    var cardRef = useRef(null)

    function handleLogin(){
        dispatch(loginApi({username,password}))
          toast.success("Login Success")
        //   navigate("/products")
    }

    useEffect(()=>{
        if(user){
            // toast.success("Login Success")
            navigate("/products")   
        }
    },[user])

   
    const handleMouseMove = (e) => {
        var card = cardRef.current
        var rect = card.getBoundingClientRect()
        var x = e.clientX - rect.left
        var y = e.clientY - rect.top

        var rotateX = -(y - rect.height / 2) / 20
        var rotateY = (x - rect.width / 2) / 20

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    function resetTilt(){
        cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`
    }

  return (
    <div className="auth3d-container">
        <Toaster/>

      
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>

        <div 
            className="login3d-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
        >
            <h2>Welcome Back</h2>

            <div className="input-group">
                <input 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    type="text"
                    required
                />
                <label>Username</label>
            </div>

            <div className="input-group">
                <input 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    required
                />
                <label>Password</label>
            </div>

            <button className="login3d-btn" onClick={handleLogin}>
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && <p className="error-text">{error}</p>}
        </div>
    </div>
  )
}

export default AuthUi
