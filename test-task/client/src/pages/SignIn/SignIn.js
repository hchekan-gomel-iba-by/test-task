import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers } from "../../redux/actions/usersActions";
import { setCurrentUser } from "../../redux/actions/authActions";
import Form from "../../components/Form";
import { formInputsSignIn } from "../../common/utils/helpers/formInputs";

const TEXT_ERROR_SIGNIN = "Incorrect data";

const SignIn = ({ users, getUsers, setUser }) => {
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const checkUserDataIsValid = (username, password) => {
    let userIsValid = false;
    users.data.forEach((user) => {
      if (user.username === username && user.password === password) {
        userIsValid = user;
        return;
      }
    });

    return userIsValid;
  };

  const submitHandler = (formIsValid, formStateInputs, setValidData) => {
    if (!formIsValid) {
      return;
    }
    const user = checkUserDataIsValid(
      formStateInputs.username.value,
      formStateInputs.password.value
    );

    if (user) {
      setUser(user);
      setValidData(true);
      history.replace("/projects");
    } else {
      setValidData(false);
    }
  };

  return (
    <Form
      formInputs={formInputsSignIn}
      onSubmit={submitHandler}
      textError={TEXT_ERROR_SIGNIN}
      labelButton="sign in"
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  setUser: setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
