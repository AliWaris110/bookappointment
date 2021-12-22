import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { sendToken, passwordReset } from '../redux-store/actions/auth'

import './forgotpassword.css'
//////required customization////

const ForgotPassword = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [token, setToken] = useState('')

  const [loadingVerify, setLoadingVerify] = useState(false)
  const [loadingSendToken, setLoadingSendToken] = useState(false)
  const [isTokenSend, setIsTokenSend] = useState(true)
  const [successful, setSuccessful] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const dispatch = useDispatch()

  const onChangeEmail = (e) => {
    const email = e.target.value

    setEmail(email)
  }
  const onChangeToken = (e) => {
    const token = e.target.value
    setToken(token)
  }
  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }
  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value
    setConfirmPassword(confirmPassword)
  }
  const handleSendToken = (e) => {
    e.preventDefault()
    setLoadingSendToken(true)
    setSuccessful(false)
    if (email === '' || !email.includes('@gmail.com')) {
      setIsTokenSend(true)
    } else {
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(sendToken(email))
          .then((response) => {
            console.log('Response in sendToken: ', response)
            alert('Please check your email for token verification')
            setLoadingSendToken(false)
            
          })
          .catch((response) => {
            setLoadingSendToken(true)
            setSuccessful(false)
            if (response.status === 404) {
              window.location.reload()
              return
            }
          })
      } else {
        setLoadingSendToken(false)
      }
      setIsTokenSend(false)
    }
  }
  const handleForgetPassword = (e) => {
    e.preventDefault()

    setLoadingVerify(true)
    setSuccessful(false)

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(passwordReset(token, password, confirmPassword))
        .then((response) => {
          if (password !== confirmPassword) {
            alert("Password Doesn't match")
            setSuccessful(false)
            setLoadingVerify(false)
            return;
          }
          else{

              setSuccessful(true)
              props.history.push('/login')
              window.location.reload()
          }
        })
        .catch((response) => {
          setLoadingVerify(true)
          setSuccessful(false)
          console.log("Response here",response)
          if (response.status === 404) {
            window.location.reload()
            return
          }
        })
    } else {
      setLoadingVerify(false)
    }
  }


  return (
    <div className="forgotpassword-container">
      <Form
        ref={form}
        onSubmit={handleForgetPassword}
        className="forgotpassword-form"
      >
        <h1>Forgot Password</h1>

        {!successful && (
          <>
            <div className="form-group">
              <Input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                required
              />
              <button className={`send-token ${email?'active':''}`}
                ref={checkBtn}
                onClick={handleSendToken}
                disabled={!email.includes('@gmail.com')}
              >
                {loadingSendToken && (
                  <span className="spinner-border spinner-border-sm verify-button"></span>
                )}
                <span className='send-token__content'> Send Token</span>
              </button>
            </div>

            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                placeholder="Verification Token"
                name="token"
                value={token}
                disabled={isTokenSend}
                onChange={onChangeToken}
                required
                autoComplete='true'
              />
            </div>

            <div className="form-group">
              <Input
                className="form-control"
                type="password"
                placeholder="password"
                name="password"
                value={password}
                disabled={isTokenSend}
                onChange={onChangePassword}
                required
                autoComplete='true'
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="password"
                placeholder="Confirm password"
                name="password"
                value={confirmPassword}
                disabled={isTokenSend}
                onChange={onChangeConfirmPassword}
                required
                autoComplete='true'
              />
            </div>

            <button  className={`verify ${confirmPassword?'active':''}`}
            ref={checkBtn} 
            type="submit" 
            disabled={isTokenSend}>
              {loadingVerify && (
                <span className="spinner-border spinner-border-sm verify-button"></span>
              )}
              <span> Verify</span>
            </button>
          </>
        )}

        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  )
}
export default ForgotPassword
