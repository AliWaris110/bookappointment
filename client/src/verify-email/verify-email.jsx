import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { verifyToken } from '../redux-store/actions/auth'

import './verify-email.css'
//////required customization////

const VerifyEmail = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [token, setToken] = useState('')

  const [loading, setLoading] = useState(false)

  const { isLoggedIn,user:currentUser } = useSelector((state) => state.auth)
  const [successful, setSuccessful] = useState(false)
 

  const dispatch = useDispatch()

  const onChangeToken = (e) => {
    const token = e.target.value
    setToken(token)
  }

  const handleVerify = (e) => {
    e.preventDefault()

    setLoading(true)
    setSuccessful(false)

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(verifyToken(token))
        .then((response) => {
          console.log('Response in verify: ', response)
          setSuccessful(true)
          props.history.push('/login')
          window.location.reload()
        })
        .catch((response) => {
          setLoading(true)
          setSuccessful(false)
          if (response.status === 404) {
            window.location.reload()
            return
          }
        })
    } else {
      setLoading(false)
    }
  }

  if (isLoggedIn && currentUser.user.role==='user') {
    return <Redirect to="/user/profile" />
  }
  else if(isLoggedIn && currentUser.user.role==='admin'){
    return <Redirect to='/admin/dashboard'/>
  }

  return (
    <div className="verify-container">
      <Form ref={form} onSubmit={handleVerify} className="verify-form">
        <h1>Verify Email</h1>

        {!successful && (
          <>
            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                placeholder="Verification Token"
                name="token"
                value={token}
                size="80"
                onChange={onChangeToken}
                required
              />
            </div>

            <button ref={checkBtn} type="submit" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span> Verify</span>
            </button>
          </>
        )}

        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
      {/* {message && (
          <div className="form-group ">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
            >
              
            </div>
          </div>
        )} */}
    </div>
  )
}
export default VerifyEmail
