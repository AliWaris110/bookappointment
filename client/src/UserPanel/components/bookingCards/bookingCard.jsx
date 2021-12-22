import React, { useState, useEffect } from 'react'
// import './bookingCard.css';
import BookingCardItem from './bookingCardItem'
import carwash from './car_wash.png'
import shadiHall from './shadi_hall.jpg'
import DEMOIMG from './demo_booking.jpg'
const BookingCard = (props) => {
  const { serviceTypes, data,handleNavLink } = props
  const [desiredImage, setDesiredImage] = useState()

  const DEMO_IMAGE = DEMOIMG
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={window.location.origin + '/user/bookingCard.css'}
      />

       <BookingCardItem
                src={
                  serviceTypes === 'CarWash'
                    ? carwash
                    : serviceTypes === 'ShadiHall'
                    ? shadiHall
                    : DEMO_IMAGE
                }
                venue={data.venue}
                location={data.location}
                label={serviceTypes}
                title={data.title}
                handleNavLink={handleNavLink}
              />
      
    </>
  )
}

export default BookingCard
