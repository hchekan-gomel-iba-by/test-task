import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Stack from "@mui/material/Stack";

import { fetchUsers } from '../../redux/actions/usersActions';
import { setCurrentUser } from '../../redux/actions/authActions';

import CustomButton from "../../components/CustomButton";
import CustomTextField from "../../components/CustomTextField";
import styles from "./SignIn.module.scss";

const SignIn = ({ users, getUsers, setUser }) => {
  const history = useHistory();
  const [validData, setValidData] = useState(true);

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

  const checkUserDataIsValid = (username, password) => {
    let userIsValid = false;
    users.data.forEach(user => {
      if(user.username === username && user.password === password){
        userIsValid=user;
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
    const user = checkUserDataIsValid(formStateInputs.username.value, formStateInputs.password.value);

    if (user) {
      setUser(user);
      setValidData(true);
      history.replace("/projects");
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
        <CustomTextField
          key={item}
          label={input.label}
          type={input.type}
          name={input.name}
          enteredValue={formStateInputs[input.name].value}
          typeCheck={input.check}
          onChangeInput={onChangeInput}
        />
      ))}
      <CustomButton
        label="Sign In"
        onClick={submitHandler}
        disabled={!formIsValid}
      />
    </Stack>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  setUser: setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
