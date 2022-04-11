import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import CustomButton from "../../components/CustomButton";
import Stack from "@mui/material/Stack";
import CustomTextField from "../../components/CustomTextField";
import styles from "./SignUp.module.scss";

import { fetchUsers, createUser } from "../../redux/actions/usersActions";

const ROLE = "admin";

const SignUp = ({ users, getUsers, addUser }) => {
  const [validData, setValidData] = useState(true);
  const history = useHistory();
  
  useEffect(() => {
    getUsers();
  }, []);

  const formInputs = [
    {
      type: "text",
      value: "",
      name: "username",
      label: "Username",
      check: "isEmpty",
    },
    {
      type: "text",
      value: "",
      name: "email",
      label: "Email",
      check: "isEmail",
    },
    {
      type: "password",
      value: "",
      name: "password",
      label: "Password",
      check: "isPassword",
    },
  ];

  const [formIsValid, setFormIsValid] = useState(false);
  const [formStateInputs, setFormStateInputs] = useState(
    formInputs.reduce((obj, input) => {
      obj[input.name] = { value: input.value, isValid: false };
      return obj;
    }, {})
  );

  const onChangeInput = (inputName, isValid, value) => {
    setFormStateInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: { value: value, isValid: isValid },
    }));
  };

  const onClearInput = () => {
    setFormStateInputs(
      formInputs.reduce((obj, input) => {
        obj[input.name] = { value: input.value, isValid: false };
        return obj;
      }, {})
    );
  };

  useEffect(() => {
    const isValidForm = Object.values(formStateInputs)
      .map((input) => input.isValid)
      .reduce((isValid, nextIsValid) => {
        return isValid && nextIsValid;
      }, true);

    setFormIsValid(isValidForm);
  }, [formStateInputs]);

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

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userIsValid = checkUsernameIsValid(formStateInputs.username.value);

    if (userIsValid) {
      const user = {
        username: formStateInputs.username.value,
        email: formStateInputs.email.value,
        password: formStateInputs.password.value,
        role: ROLE
      }
      addUser(user);
      setValidData(true);
      history.replace("/SignIn");
      onClearInput();
    } else {
      setValidData(false);
    }
  };

  return (
    <div className={styles.form}>
      <Stack direction="column" spacing={3} alignItems="center">
      {!validData && <p>Incorrect data</p>}
        {formInputs.map((input, item) => (
          <div key={item}>
            <CustomTextField
              label={input.label}
              type={input.type}
              name={input.name}
              enteredValue={formStateInputs[input.name].value}
              typeCheck={input.check}
              onChangeInput={onChangeInput}
            />
          </div>
        ))}
        <CustomButton
          label="Sign Up"
          onClick={submitHandler}
          disabled={!formIsValid}
        />
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  addUser: createUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
