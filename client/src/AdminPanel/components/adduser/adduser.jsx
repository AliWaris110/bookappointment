import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import CheckButton from 'react-validation/build/button'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'

import './adduser.css'
import { addUserByAdmin } from '../../../redux-store/actions/auth'

const AddUser = () => {
  const checkBtn = useRef()
  const form = useRef()
  const [successful, setSuccessful] = useState(false)
  const [loadingAddUser, setLoadingAddUser] = useState(false)
  const [role, setRole] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [borderColor,setBorderColor]=useState(false)
  const [emailBorder,setEmailBorder]=useState(false)
  const [checkState, setCheckState] = useState()
  const dispatch = useDispatch()

  ////////form fileds handleChange Events//////
  const onChangeRole = (e) => {
    let role = e.target.value
    setRole(role)
  }

  const onChangeFirstName = (e) => {
    let firstName = e.target.value
    setFirstName(firstName)
  }
  const onChangeLastName = (e) => {
    let lastName = e.target.value
    setLastName(lastName)
  }
  const onChangeEmail = (e) => {
      setEmailBorder(false)
    let email = e.target.value

    setEmail(email)
  }
  const onChangePassword = (e) => {
    let password = e.target.value
    setPassword(password)
  }
  const onChangeConfirmPassword = (e) => {
      setBorderColor(false)
    let confirmPassword = e.target.value
    setConfirmPassword(confirmPassword)
  }

  ////Handle AddUserEvent////////////
  const handleAddUser = (e) => {
    e.preventDefault();
    setLoadingAddUser(true)
    setSuccessful(false)
    if (password !== confirmPassword) {
        e.preventDefault();
        setLoadingAddUser(false)
        setBorderColor(true)
   } 
    else if (checkBtn.current.context._errors.length === 0) {
      dispatch(addUserByAdmin(role, firstName, lastName, email, password))
        .then((response) => {
            alert("User Created Successfully")
           setCheckState(response)
          setSuccessful(true)
          window.location.pathname = '/admin/users/';
          window.location.reload();
        })
        .catch((ErrorResponse) => {
          setLoadingAddUser(true)
          setSuccessful(false)
        
        if(ErrorResponse.status===400){
            alert('This user already exists')
            setLoadingAddUser(false)
            setEmailBorder(true);
            return;
        }
        //   console.log('Response error in HandleAddUSer: ',ErrorResponse.status)
         else if (ErrorResponse.status === 404) {
              alert('User not Found!');
            // window.location.realod()
            return
          }
        })
    } else {
      setLoadingAddUser(false)
    }
  }
  return (
    <>
      <div className="add-user-panel">
        <h1>Add New User</h1>
        <Form 
        ref={form} 
        onSubmit={handleAddUser}
        >
          {!successful && (
            <>
              <div className="form-group">
                <label className="role__label">Select Role</label>
                <Select
                  onChange={onChangeRole}
                  className="form-control"
                  name="role"
                >
                  <option>Select Role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                  {/* <option>mod</option> */}
                </Select>
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  aria-describedby="firstName Help"
                  placeholder="Enter First Name"
                  required
                  onChange={onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <Input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  aria-describedby="lastNameHelp"
                  placeholder="Enter Last Name"
                  required
                  onChange={onChangeLastName}
                />
              </div>
              <div className="form-group">
                <Input
                  type="email"
                  className={`form-control ${emailBorder?'email-border':''}`}
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
                  onChange={onChangeEmail}
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={onChangePassword}
                  autoComplete='true'
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  className={`form-control ${borderColor?'password-border':''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  onChange={onChangeConfirmPassword}
                  autoComplete='true'
                />
              </div>
              <div className="add-user submit-button">
                <div className="add-user__icon">
                  <i className="bx bxs-user-plus"></i>
                </div>

                <div className="add-user__info">
                  <button
                    ref={checkBtn}
                    type="submit"
                    className="add-user-link"
                  >
                    {loadingAddUser && (
                      <span className="spinner-border spinner-border-sm verify-button"></span>
                    )}
                    <span>Add User</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </>
  )
}

export default AddUser
