import React, { useState, useEffect } from 'react';
import Table from '../components/table/table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux-store/actions/auth';
import Badge from '../components/badge/badge';
const userStatus = {
  active: 'success',
  inActive: 'warning',
}
const Users = ({ match }) => {
  const { path } = match
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const allUsers = {
    head: ['firstName', 'lastName', 'email', 'role', 'active', 'Manage'],
    body: [],
  }
  const user = []
  // const path='localhost'
  const renderUserHeaad = (item, index) => <th key={index}>{item}</th>

  useEffect(() => {
    dispatch(getAllUsers()).then((response) => {
      const temp = response.data.allUsers.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        role: item.role,
        active: item.active,
      }))
      console.log('finding users: ', temp)

      setUsers([...temp])
    })
  }, [])

  if (users) {
    allUsers.body = users
  }
  const renderUserBody = (item, index) => (
    <tr key={index}>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>

      <td>
        <Badge
          type={userStatus[item.active.toString()==='true' ? 'active' : 'inActive']}
          content={item.active.toString()==='true' ? 'active' : 'inActive'}
        />
      </td>

      <td style={{ whiteSpace: 'nowrap' }}>
        <Link
          to={`${path}/edituser/${user.id}`}
          className="btn btn-sm btn-primary mr-1"
        >
          Edit
        </Link>
        <button
          /*onClick={() => userActions.delete(user.id)}*/ className="btn btn-sm btn-danger "
          disabled={user.isDeleting}
        >
          {user.isDeleting ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <span>Delete</span>
          )}
        </button>
      </td>
    </tr>
  )

  return (
    <div>
      <h2 className="page-header">Manage Users</h2>

      <div className="add-user">
        <div className="add-user__icon">
          <i className="bx bxs-user-plus"></i>
        </div>
        <div className="add-user__info">
          <Link to={`${path}/addUser`} className="add-user-link">
            <span>Add User</span>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={allUsers.head}
                renderHead={(item, index) => renderUserHeaad(item, index)}
                bodyData={allUsers.body}
                renderBody={(item, index) => renderUserBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
