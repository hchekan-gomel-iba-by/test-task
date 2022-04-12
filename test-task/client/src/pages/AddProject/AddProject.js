import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { createProject } from "../../redux/actions/projectsActions";
import { fetchUsers } from "../../redux/actions/usersActions";
import Form from "../../components/Form";
import { formInputsAddProject } from "../../common/utils/helpers/formInputs";

const AddProject = ({ addProject, getUsers }) => {
  const history = useHistory();
  useEffect(() => {
    getUsers();
  }, []);

  const submitHandler = (formIsValid, formStateInputs, setValidData) => {
    if (!formIsValid) {
      return;
    }

    const project = {
      name: formStateInputs.name.value,
      date_start: formStateInputs.dateStart.value,
      date_finish: formStateInputs.dateFinish.value,
    };
    addProject(project);
    setValidData(true);
    history.replace("/projects");
  };

  return (
    <Form
      formInputs={formInputsAddProject}
      onSubmit={submitHandler}
      textError=""
      labelButton="add project"
    />
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
