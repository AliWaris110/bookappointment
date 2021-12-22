import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/table/table';
import { useDispatch,useSelector } from 'react-redux';
import { getAllBooking } from '../../redux-store/actions/auth';
import Badge from '../components/badge/badge';
const bookingsStatus = {
  active: 'primary',
  pending: 'warning',
  completed: 'success',
}
const BookingHistory = () => {
  const [booking, setBookings] = useState([])
  const dispatch=useDispatch();
  const allBooking = {
    head: ['id', 'serviceType', 'Venue', 'Location', 'date', 'time', 'status'],
    body: [],
  }
  const renderBookingBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.serviceType}</td>
      <td>{item.venue}</td>
      <td>{item.location}</td>
      <td>{item.date}</td>
      <td>{item.time}</td>
      <td>
      <Badge type={bookingsStatus[item.status]} content={item.status} />
    </td>

    </tr>
  )
  const renderBookingHeaad = (item, index) => <th key={index}>{item}</th>
  useEffect(() => {
    dispatch(getAllBooking()).then((response) => {
      const temp = []
      response.data.completedBookings.map((item) =>
        temp.push({
          id: item.id,
          serviceType: item.title,
          venue: item.venue,
          location: item.location,
          date: item.date,
          time: item.time,

          status: item.status,
        }),
      )
      setBookings([...temp])
    })
  }, [])

  if (booking) {
    allBooking.body = booking
  }



  return (
    <div>
        <h2>Booking history</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={allBooking.head}
                renderHead={(item, index) => renderBookingHeaad(item, index)}
                bodyData={allBooking.body}
                renderBody={(item, index) => renderBookingBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingHistory
