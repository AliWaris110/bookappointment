import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Home from '../components/home/home';
import Profile from './profile/profile';
import BookingInfo from './booking-info/bookingInfo';
import { history } from '../../helpers/history'
import NavBar from './navbar/navbar'
import { logout } from '../../redux-store/actions/auth'
import { clearMessage } from '../../redux-store/actions/message'


const UserIndex = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth)

  let { path, url } = useRouteMatch();


  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) // clear message when changing location
    })
  }, [dispatch])

  const logOut = () => {
    dispatch(logout())
    window.location.pathname = '/login'
  }

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/user/userIndex.css'}
      />
    
    
      <NavBar logOut={logOut} currentUser={currentUser} />

    
          <Switch>
            <Route exact path={`${path}/home`} component={Home} />

            <Route exact path={`${path}/profile`} component={Profile} />

            <Route
              exact
              path={`${path}/bookinginfo`}
              render={(props) => <BookingInfo {...props} />}
            />

            {/* default redirect */}
            <Redirect exact from={path} to={`${path}/home`} />

            <Redirect to="/404" />

          </Switch>
       
    </>
  )
}
export default UserIndex
