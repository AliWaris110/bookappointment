import React, { useState, useEffect } from 'react'
import { history } from '../helpers/history';
import Login from '../login/login'
import Register from '../signup/signup'
import '../signup/signup.css';
const LoginToggle = (props) => {
 
  const [container, setContainer] = useState()

  useEffect(() => {
    setContainer(document.getElementById('container'))
  }, [container])

  const handleSignup = () => {
    container.classList.add('right-panel-active')
  }

  const handleSignIn = () => {
    container.classList.remove('right-panel-active')
  }
  return (
    <div className=" container" id="container">
      <Register />
      <Login history={history} />
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost toggle-button" id="signIn" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Booking Appointment!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost toggle-button" id="signUp" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginToggle
