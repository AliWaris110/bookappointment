import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { register } from '../redux-store/actions/auth'

import './signup.css';
///Importing socialIcon Component
import SocialIcons from '../social-icon-container/socialicons'

const Signup = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successful, setSuccessful] = useState(false)
const [loading, setloading] = useState(false)
  let { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  ///onChangeEvents////////
  const onChangeFirstName = (e) => {
    const firstName = e.target.value
    setFirstName(firstName)
  }
  const onChangeLastName = (e) => {
    const lastName = e.target.value
    setLastName(lastName)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value
    setEmail(email)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setloading(true)
    setSuccessful(false)

    // form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstName, lastName, email, password))
        .then(() => {
          setSuccessful(true)
        })
        .catch(() => {
          setloading(false)
          setSuccessful(false)

        })
    }
  }

  return (
    <div className="form-container sign-up-container">
      <Form onSubmit={handleRegister} ref={form}>
        <h2>Create Account</h2>
        <SocialIcons />
        {!successful && (
          <>
            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={ firstName}
                required
                onChange={onChangeFirstName}
                autoComplete='true'
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                required
                onChange={onChangeLastName}
                autoComplete='true'
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                onChange={onChangeEmail}
                autoComplete='true'
              />
            </div>
            <div className="form-group">
              <Input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                minLength="8"
                required
                autoComplete='true'
                onChange={onChangePassword}
              />
            </div>
            <button  className='toggle-button' ref={checkBtn} type='submit' disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"> </span>
              )}
              
              <span>Sign Up</span>
              </button>

          </>
        )}
        {message && (
          <div className="form-group ">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: 'none' }} ref={checkBtn} />
      </Form>
    </div>
  )
}
export default Signup
