import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShowBookingInfo from './showBookingInfo'
import './bookingInfo.css'
const BookingInfo = (props) => {
  const [bookingData, setbookingData] = useState()
  const { isLoggedIn,user } = useSelector((state) => state.auth)
  useEffect(() => {
    if(isLoggedIn){

      const { data } = props?.history?.location?.state
      // console.log('Type: ',typeof data)
      setbookingData(data)
      
    }
    else{
     return  window.location.pathname='/'
    }
  }, [])

  return (
    <>
      {bookingData && <ShowBookingInfo bookingData={bookingData} />}
   </>
  )
}
export default BookingInfo
