import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
// import './home.css'
import UserService from '../../../services/user.service'
import { getAllServiceTypes } from '../../../redux-store/actions/auth'
import HeroSection from '../hero-section/herosection'
import BookingCard from '../bookingCards/bookingCard'
import Footer from '../footer/footer'
const Home = () => {
  const [content, setContent] = useState('')
  const [booking, setBooking] = useState([])
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [serviceTypes, setServiceTypes] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setBooking(response.data.availableBookings)
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString()

        setContent(_content)
      },
    )
    ////getting all types of service early///
    dispatch(getAllServiceTypes())
      .then((response) => {
        setServiceTypes([...response])
      })
      .catch((ErrorResponse) => {
        console.log('Error in dispatching Service Types: ', ErrorResponse)
      })
  }, [])

  const handleNavLink = (data) => {
    if (isLoggedIn) {
      return { pathname: '/user/bookinginfo', state: { data } }
    } else {
      return { pathname: '/login' }
    }
  }
  return (
    <>
      <div className="container-fluid">
        {/* <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/user/home.css'}
      /> */}
        {/* <HeroSection/> */}
        <div className="row">
          
            {booking.map((data) => (
             

              <div key={ data.id}className="col-md-4 col-xs-12 col-sm-5 col-lg-3" style={{padding:'10px'}}>
                
                <BookingCard
                  key={data.id}
                  serviceTypes={
                    serviceTypes.find((i) => i.id === data.typeId).typeName
                  }
                  data={data}
                  handleNavLink={handleNavLink(data)}
                />
                  
                
              </div>
            
            ))}
         
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
