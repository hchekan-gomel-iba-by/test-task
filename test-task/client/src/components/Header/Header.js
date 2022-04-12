import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import WrapperLink from "../../HOCS/WrapperLink";
import styles from "./Header.module.scss";
import { clearCurrentUser } from "../../redux/actions/authActions";

const ADMIN = "admin";

const Header = ({ currentUser, logout }) => {
  const history = useHistory();
  const role = currentUser.data.role ? currentUser.data.role : false;

  const logoutHandler = () => {
    history.replace("/SignIn");
    logout();
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>TestApp</div>
      <div className={styles.navigation}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <WrapperLink
              condition={role}
              title="Projects"
              to="/projects"
              activeClassName={styles.active}
            />
            <WrapperLink
              condition={role === ADMIN}
              title="Users"
              to="/users"
              activeClassName={styles.active}
            />
            <WrapperLink
              condition={role === ADMIN}
              title="Chart"
              to="/charts"
              activeClassName={styles.active}
            />
            <WrapperLink
              condition={!role}
              title="Sign In"
              to="/signIn"
              activeClassName={styles.active}
            />
            <WrapperLink
              condition={!role}
              title="Sign Up"
              to="/signUp"
              activeClassName={styles.active}
            />
            <li className={styles.li}>
              {role && (
                <a href="" onClick={logoutHandler}>
                  Sign Out
                </a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
});
const mapDispatchToProps = {
  logout: clearCurrentUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
