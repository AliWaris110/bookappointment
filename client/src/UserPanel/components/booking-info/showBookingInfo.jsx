import React, { useState, useEffect, useRef } from 'react'
import './bookingInfo.css'
import { useDispatch, useSelector } from 'react-redux'
import CustomDateTimePicker from '../date-time-picker/customDateTimePicker'

import { saveBooking } from '../../../redux-store/actions/auth'
import moment from 'moment'
const ShowBookingInfo = (props) => {
  const checkBtn = useRef()
  const [userId, setuserId] = useState()
  const [dateTime, setDateTime] = useState({})

  const [loading, setLoading] = useState(false)
  const { message } = useSelector((state) => state.message)
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  const [successful, setSuccessful] = useState(true)
  const [data, setdata] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    if (props && isLoggedIn) {
      const { user: currentUser } = user
      const { bookingData: data } = props
      setdata(data)

      setuserId(currentUser.id)
    }
  }, [])

  useEffect(() => {
    console.log('Time only: ', new Date(dateTime).getTime())
  }, [dateTime])

  const handleBooking = (e) => {
    e.preventDefault()
    const newData = {
      ...data,
      status: 'pending',
      time: new Date(dateTime).getTime().toString(),
      date: moment(dateTime).format('DD-MM-YYYY'),
    }

    if (successful) {
      dispatch(saveBooking(data.id, newData))
        .then((response) => {
          setLoading(true)
          setSuccessful(false)
          alert('booking saved successfully!')
          window.location.pathname = '/user/home'
          // window.location.reload()
        })
        .catch((ErrorResponse) => {
          setLoading(true)
          setSuccessful(true)
        })
      return
    } else {
      setLoading(false)
    }
  }
  return (
    <div id="booking" class="section">
      <div class="section-center">
          <div class="row">
            <div class="booking-form">
              <div class="form-header">
                <h2 style={{color:'#fff'}}>Make your Booking Appointment</h2>
              </div>

              <div style={{ color: '#fff', width: '100%' }}>
                <div className="card-body">
                  
                  <div className="booking__info">
                    {/* <p className="card-text">
                      {' '}
                      Service Type: <span>{data.typeId}</span>
                    </p> */}
                    <p className="card-text">
                      {' '}
                      Service Name: <span>{data.title}</span>
                    </p>
                    <p className="card-text">
                      {' '}
                      Location: <span>{data.location}</span>
                    </p>
                    <p className="card-text">
                      {' '}
                      Venue: <span>{data.venue}</span>
                    </p>
                    <p className="card-text"> Pick Time: </p>
                    <div className="custom-date">
                      <CustomDateTimePicker
                        className="date-picker"
                        handleDateChange={(selectedDate) => {
                          setDateTime(selectedDate)
                        }}
                      />
                    </div>
                  </div>
                  <div className="booking-btn">
                    <button
                      ref={checkBtn}
                      type="button"
                      className="btn save-booking-btn btn-lg"
                      onClick={handleBooking}
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span> Save Booking</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  )
}
export default ShowBookingInfo
