import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './profile.css'
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth)

  if (!currentUser) {
    return <Redirect to="/login" />
  }

  return (
    <div id="booking" className="section">
      <div className="section-center">
        <div className="row">
          <div className="booking-form">
            <div style={{ color: '#fff', width: '100%' }}>
              <div className="card-body">
                {currentUser && (
                  <div>
                    <div className="form-header">
                      <h2 style={{ color: '#fff' }}>User Information</h2>
                    </div>
                    <p>
                      <strong>Token:</strong>{' '}
                      {currentUser?.jwtToken?.substring(0, 20)} ...{' '}
                      {currentUser?.jwtToken?.substr(
                        currentUser?.jwtToken?.length - 20,
                      )}
                    </p>

                    <p>
                      <strong>First Name:</strong>{' '}
                      {currentUser?.user?.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {currentUser?.user?.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentUser?.user?.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul style={{ marginLeft: '40px' }}>
                      {currentUser?.user?.role && (
                        <li key={currentUser?.user?.id}>
                          {currentUser?.user?.role}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {!currentUser && <div>loading user...</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
