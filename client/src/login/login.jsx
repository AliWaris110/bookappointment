import React, { useState, useEffect,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import '../signup/signup.css'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { login, logout } from '../redux-store/actions/auth'

///Importing socialIcon Component
import SocialIcons from '../social-icon-container/socialicons'
import VerifyEmail from '../verify-email/verify-email'

//////required customization////

const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  let { message } = useSelector((state) => state.message)
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth)
  // console.log('checking isLoggedIn in login panel: ',isLoggedIn)
  const [successful, setSuccessful] = useState(false)

  const dispatch = useDispatch()

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setLoading(true)
    setSuccessful(false)

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then((data) => {
          setLoading(true)
          // setSuccessful(true)
          data?.user?.role === 'admin'
            ? (window.location.pathname = '/admin')
            : (window.location.pathname = '/user')
          // window.location.pathname='/';
          // console.log('path: ',window.location.pathname)
          // window.location.reload();
        })
        .catch((response) => {
          setLoading(true)
          setSuccessful(false)
          if (response.status === 404) {
            alert('User Not found')
            window.location.reload()
            return
          }
        })
    } else {
      setLoading(false)
    }
  }
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.log('Error in parseJwt: ',e)
      return null;
    }
  };
  
  useEffect(() => {
  const expTime=parseJwt(currentUser?.jwtToken);
    
   if(currentUser && expTime && (new Date(expTime.exp*1000)> Date.now())){
      if(currentUser?.user?.role==="admin"){
        console.log('2');
        window.location.pathname='/admin'
        
      }
      else if(currentUser?.user?.role==="user"){
        console.log('3');
        window.location.pathname='/user'

      }
   }
  
  }, [])
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/user/userIndex.css'}
      />

      <div className="form-container sign-in-container">
        <Form ref={form} onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <SocialIcons />
          {!successful && (
            <>
              <span>or use your account</span>
              <div className="form-group">
                <Input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  required
                  autoComplete="true"
                />
              </div>
              <div className="form-group">
                <Input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  required
                  autoComplete="true"
                  onChange={onChangePassword}
                />
              </div>
              <Link to="/forgot-password">Forgot your password?</Link>

              <button 
              className='toggle-button'
              ref={checkBtn} type="submit" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span> Sign In</span>
              </button>
            </>
          )}

          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
        {message && <VerifyEmail />}
      </div>
    </>
  )
}
export default Login
