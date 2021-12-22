import React, { useState,useEffect } from 'react'
import './layout.css'

import Sidebar from '../sidebar/sidebar'
import TopNav from '../topnav/topnav'
import Routes from '../routes'

import { BrowserRouter, Route,Redirect } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../../redux-store/actions/ThemeAction'


const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer)
  const { user: currentUser } = useSelector((state) => state.auth)
 
  const dispatch = useDispatch()


  useEffect(() => {
    const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')
    const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')
    dispatch(ThemeAction.setMode(themeClass))
    dispatch(ThemeAction.setColor(colorClass))
  }, [dispatch])


  if(currentUser?.user?.role==='user'){
    window.location.pathname='/user/home'
    // window.location.reload();
  }


  return (
    <>
     <link
        rel="stylesheet"
        type="text/css"
        href={
          window.location.origin +
          '/admin/assets/boxicons-2.0.7/css/boxicons.min.css'
        }
      />

      <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/admin/assets/css/grid.css'}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/admin/assets/css/theme.css'}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/admin/assets/css/index.css'}
      /> 
        <Route
          render={(props) => (
            <div
              className={`layout ${themeReducer.mode} ${themeReducer.color}`}
            >
              <Sidebar {...props} />
              <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                  <Routes />
                </div>
              </div>
            </div>
          )}
        />
    </>
  )
}
export default Layout
