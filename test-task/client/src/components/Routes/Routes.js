import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "../../HOCS/ProtectedRoute";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./Routes.module.scss";

const Welcome = React.lazy(() => import("../../pages/Welcome"));
const SignIn = React.lazy(() => import("../../pages/SignIn"));
const SignUp = React.lazy(() => import("../../pages/SignUp"));
const NotFound = React.lazy(() => import("../../pages/NotFound"));
const Projects = React.lazy(() => import("../../pages/Projects"));
const Users = React.lazy(() => import("../../pages/Users"));
const AddProject = React.lazy(() => import("../../pages/AddProject"));
const Project = React.lazy(() => import("../../pages/Project"));
const User = React.lazy(() => import("../../pages/User"));
const Charts = React.lazy(() => import("../../pages/Charts"));

const ADMIN = "admin";

const Routes = ({ currentUser }) => {
  const role = currentUser.data.role ? currentUser.data.role : false;

  return (
    <Suspense
      fallback={
        <div className={styles.centered}>
          <LoadingSpinner />
        </div>
      }
    >
      <Switch>
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/">
          <Redirect to="/welcome" />
        </Route>
        <ProtectedRoute condition={!role} path="/signIn" component={SignIn} />
        <ProtectedRoute condition={!role} path="/signUp" component={SignUp} />
        <ProtectedRoute
          condition={role}
          path="/projects"
          component={Projects}
        />
        <ProtectedRoute
          condition={role}
          path="/project/:id"
          component={Project}
        />
        <ProtectedRoute
          condition={role === ADMIN}
          path="/user/:id"
          component={User}
        />
        <ProtectedRoute
          condition={role === ADMIN}
          path="/addProject"
          component={AddProject}
        />
        <ProtectedRoute
          condition={role === ADMIN}
          path="/users"
          component={Users}
        />
        <ProtectedRoute
          condition={role === ADMIN}
          path="/charts"
          component={Charts}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
export default connect(mapStateToProps)(Routes);
