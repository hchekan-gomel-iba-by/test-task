import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from '../../HOCS/ProtectedRoute';
import Welcome from '../../pages/Welcome';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import NotFound from '../../pages/NotFound';
import Projects from '../../pages/Projects';
import Users from '../../pages/Users';
import AddProject from '../../pages/AddProject';
import Project from '../../pages/Project';

const ADMIN = 'admin';

const Routes = ({ currentUser }) => {
  const role = currentUser.data.role ? currentUser.data.role : false;

  return (
    <Switch>
      <Route exact path='/welcome' component={Welcome} />
      <Route exact path='/'>
        <Redirect to='/welcome' />
      </Route>
      <ProtectedRoute
        condition={!role}
        path='/signIn'
        component={SignIn}
      />
      <ProtectedRoute
        condition={!role}
        path='/signUp'
        component={SignUp}
      />
      <ProtectedRoute
        condition={role}
        path='/projects'
        component={Projects}
      />
      <ProtectedRoute
        condition={role}
        path='/project/:id'
        component={Project}
      />
      <ProtectedRoute
        condition={role}
        path='/addProject'
        component={AddProject}
      />
      <ProtectedRoute
        condition={role === ADMIN}
        path='/users'
        component={Users}
      />
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  );
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
})
export default connect(mapStateToProps)(Routes);
