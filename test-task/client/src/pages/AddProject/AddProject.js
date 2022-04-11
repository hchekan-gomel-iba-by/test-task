import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Stack from "@mui/material/Stack";

import CustomButton from "../../components/CustomButton";
import ListUsers from "../../components/ListUsers/ListUsers";
import CustomTextField from "../../components/CustomTextField";
import CustomDateField from "../../components/CustomDateField";
import { createProject } from "../../redux/actions/projectsActions";
import { fetchUsers } from "../../redux/actions/usersActions";

import styles from "./AddProject.module.scss";

const AddProject = ({ users, addProject, getUsers }) => {
  const history = useHistory();
  useEffect(() => {
    getUsers();
  }, []);
  const [personName, setPersonName] = useState([]);

  const formInputs = [
    {
      type: "text",
      value: "",
      name: "name",
      label: "Name",
      check: "isEmpty",
    },
    {
      type: "date",
      value: "",
      name: "dateStart",
      label: "Start date",
      check: "isEmpty",
    },
    {
      type: "date",
      value: "",
      name: "dateFinish",
      label: "End date",
      check: "isNotCheck",
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

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const project = {
      name: formStateInputs.name.value,
      date_start: formStateInputs.dateStart.value,
      date_finish: formStateInputs.dateFinish.value,
      list_users: personName.join(","),
    };
    addProject(project);
    history.replace("/projects");
    onClearInput();
  };

  return (
    <div>
      <div className={styles.form}>
        <Stack direction="column" spacing={3} alignItems="center">
          {formInputs.map((input, item) => (
            <div key={item}>
              {input.type !== "date" ? (
                <CustomTextField
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  enteredValue={formStateInputs[input.name].value}
                  typeCheck={input.check}
                  onChangeInput={onChangeInput}
                />
              ) : (
                <CustomDateField
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  enteredValue={formStateInputs[input.name].value}
                  typeCheck={input.check}
                  onChangeInput={onChangeInput}
                />
              )}
            </div>
          ))}
          <ListUsers userName={personName} setUserName={setPersonName} />
          <CustomButton
            label="Add Project"
            onClick={submitHandler}
            disabled={!formIsValid}
          />
        </Stack>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  addProject: createProject,
  getUsers: fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
