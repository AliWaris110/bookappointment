import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  Router,
} from 'react-router-dom'
import DashBoard from '../Admin/dashboard'
import Users from '../Admin/users'
import BookingHistory from '../Admin/bookingHistory'
import CreateService from '../Admin/createService'
import Settings from '../Admin/settings'
import AddUser from './adduser/adduser'
import EditUser from './edituser/edituser'
const Routes = () => {
  let { path, url } = useRouteMatch()
  return (
    <div>
        <Switch>
          <Route exact path={`${path}/dashboard`} component={DashBoard} />
          <Route exact path={`${path}/users`} component={Users} />
          <Route exact path={`${path}/users/addUser`} component={AddUser} />
          <Route exact path={`${path}/users/edituser`} component={EditUser} />
          <Route exact path={`${path}/history`} component={BookingHistory} />
          <Route
            exact
            path={`${path}/createservice`}
            component={CreateService}
          />
          <Route exact path={`${path}/settings`} component={Settings} />
          <Redirect exact from={path} to={`${path}/dashboard`} />
          <Redirect to={`${path}/404`} />
        </Switch>
    </div>
  )
}

export default Routes
