import React, { useState,useEffect } from 'react'
import './navbar.css';

import { Link, Route } from 'react-router-dom'
const NavBar = (props) => {
  const { currentUser, logOut } = props
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click);
  const showButton=()=>{
    if(window.innerWidth<=960){
      setButton(false)
    }
    else{
      setButton(true)
    }

  };
  window.addEventListener('resize',showButton)

  const handleCloseMobileMenu = () => setClick(false)

  useEffect(() => {
    showButton()
  }, [])
  return (
    <>


      <nav className="navbar">
        <div className="navbar-container">
          <Link to={'/user/home'} className="navbar-logo"  onClick={handleCloseMobileMenu}>
            Booking<i className="fab fa-servicestack"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link
                to={'/user/home'}
                className="nav-links"
                onClick={handleCloseMobileMenu}
              >
                Home
              </Link>
            </li>

            {currentUser?.user?.role === 'admin' ? (
              <li className="nav-item ">
                <Link
                  to={'/admin/dashboard'}
                  className="nav-links"
                  onClick={handleCloseMobileMenu}
                >
                  Admin
                </Link>
              </li>
            ) : null}

            {currentUser ? (
              <li className="nav-item">
                <Link
                  to={'/login'}
                  className="nav-links"
                  onClick={logOut}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to={'/login'} className="nav-links">
                  Signup
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link
                  to={'/user/profile'}
                  className="nav-links"
                  onClick={handleCloseMobileMenu}
                >
                  {currentUser?.user?.firstName +
                    ' ' +
                    currentUser?.user?.lastName}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}
export default NavBar
