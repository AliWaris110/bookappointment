import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import { useSelector, useDispatch } from 'react-redux'
import ThemeAction from '../../redux-store/actions/ThemeAction'
import { Link } from 'react-router-dom'
import StatusCard from '../components/statuscard/statuscard'
import Table from '../components/table/table'
import Badge from '../components/badge/badge'
import { getAllUsers,getAllBooking,getServiceTypeNameWithTypeId } from '../../redux-store/actions/auth'
import statusCards from '../assets/JsonData/status-card-data.json'

const chartOptions = {
  series: [
    {
      name: 'Active Users',
      data: [40, 70, 80, 90, 30, 40, 60, 91, 60],
    },
    {
      name: 'Inactive Users',
      data: [20, 10, 30, 40, 50, 60, 70, 80, 10],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: { background: 'transparent' },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['active', 'inactive'],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
}

const activeUsers = {
  head: ['FirstName', 'LastName', 'Email'],

  body: [],
}

const renderUserHead = (item, index) => <th key={index}>{item}</th>

const renderUserBody = (item, index) => (
  <tr key={index}>
    <td>{item.firstName}</td>
    <td>{item.lastName}</td>
    <td>{item.email}</td>
  </tr>
)

const activeBookings = {
  header: ['Title', 'venue', 'Location', 'Service Type', 'Status'],
  body: [],
}

const bookingsStatus = {
  active: 'primary',
  pending: 'warning',
  completed: 'success',
}

const renderBookingHead = (item, index) => <th key={index}>{item} </th>
const renderBookingBody = (item, index) => (
  <tr key={index}>
    <td>{item.title}</td>
    <td>{item.venue}</td>
    <td>{item.location}</td>
    <td>{item.service}</td>
    <td>
      <Badge type={bookingsStatus[item.status]} content={item.status} />
    </td>
  </tr>
)
const DashBoard = () => {
  const [allUsers, setAllUsers] = useState([])
  const [allBookings, setAllBookings] = useState([])
const [chartHeight, setChartHeight] = useState('90%')
  const themeReducer = useSelector((state) => state.ThemeReducer.mode)
  const dispatch = useDispatch()

  useEffect(() => {
    setChartHeight('100%')
    dispatch(ThemeAction.getTheme())
  }, [])

  useEffect(() => {
    ///call an api for getting all users active/inactive

    dispatch(getAllUsers()).then((response) => {
      const temp = []
      statusCards[0].count = response.data.users.length
      statusCards[1].count = response.data.inActiveUsers.length

      response.data.users.map((item) =>
        temp.push({
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
        }),
      )
      setAllUsers([...temp])
    })
    ///call an api for getting all bookings active/inactive
    dispatch(getAllBooking()).then((response) => {
      const temp = []
      let totalBooking = 0

      statusCards[2].count = response.data.bookings.length
      statusCards[3].count = response.data.completedBookings.length
      response.data.bookings.map((item, index) =>
        temp.push({
          title: item.title,
          venue: item.venue,
          location: item.location,
          service:item.typeId,
          status: item.status,
        }),
      )
      setAllBookings([...temp])

      console.log('total Bookings: ', totalBooking)
    })
  }, [])

  if (allUsers) {
    activeUsers.body = allUsers
    console.log('all users: ', allUsers)
    console.log('active users: ', activeUsers.body)
  }

  if (allBookings) {
    activeBookings.body = allBookings
  }

  return (
    <div>
      <h2 className="page-header"> DashBoard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            <Chart
              options={
                themeReducer === 'theme-mode-dark'
                  ? {
                      ...chartOptions.options,
                      theme: { mode: 'dark' },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: 'light' },
                    }
              }
              series={chartOptions.series}
              type="line"
              height={chartHeight}
            />
          </div>
        </div>
        {/* <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Active Users</h3>
            </div>
            <div className="card__body">
              <Table
                headData={activeUsers.head}
                renderHead={(item, index) => renderUserHead(item, index)}
                bodyData={activeUsers.body}
                renderBody={(item, index) => renderUserBody(item, index)}
              />
            </div>
            <div className="card__footer"> */}
              {/* footer */}
              {/* <Link to="/admin/dashboard">View all</Link>
            </div>
          </div>
        </div> */}
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Active Bookings</h3>
            </div>
            <div className="card__body">
              <Table
                limit="10"
                headData={activeBookings.header}
                renderHead={(item, index) => renderBookingHead(item, index)}
                bodyData={activeBookings.body}
                renderBody={(item, index) => renderBookingBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/admin/dashboard">View all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashBoard
