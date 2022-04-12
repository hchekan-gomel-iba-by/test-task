import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers, createUser } from "../../redux/actions/usersActions";
import Form from "../../components/Form";
import { formInputsSignUp } from "../../common/utils/helpers/formInputs";

const ROLE = "user";
const TEXT_ERROR_SIGNUP = "The usersname already exists";

const SignUp = ({ users, getUsers, addUser }) => {
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const checkUsernameIsValid = (username) => {
    let userIsValid = true;
    users.data.forEach((user) => {
      if (user.username === username) {
        userIsValid = false;
        return;
      }
    });

    return userIsValid;
  };

  const submitHandler = (formIsValid, formStateInputs, setValidData) => {
    if (!formIsValid) {
      return;
    }
    const userIsValid = checkUsernameIsValid(formStateInputs.username.value);

    if (userIsValid) {
      const user = {
        username: formStateInputs.username.value,
        email: formStateInputs.email.value,
        password: formStateInputs.password.value,
        role: ROLE,
      };
      addUser(user);
      setValidData(true);
      history.replace("/SignIn");
    } else {
      setValidData(false);
    }
  };

  return (
    <Form
      formInputs={formInputsSignUp}
      onSubmit={submitHandler}
      textError={TEXT_ERROR_SIGNUP}
      labelButton="sign up"
    />
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  addUser: createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
