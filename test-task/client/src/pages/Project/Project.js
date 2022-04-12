import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";

import ListUsers from "../../components/ListUsers/ListUsers";
import CustomButton from "../../components/CustomButton";
import { fetchProject } from "../../redux/actions/oneProjectActions";
import { fetchUsers } from "../../redux/actions/usersActions";
import CustomTextField from "../../components/CustomTextField";
import CustomDateField from "../../components/CustomDateField";
import {
  fetchProjectUserByIdProject,
  createProjectUser,
  deleteProjectUser,
} from "../../redux/actions/projectUserActions";
import {
  createComments,
  fetchCommentsByIdProject,
} from "../../redux/actions/commentsActions";
import { updateProject } from "../../redux/actions/projectsActions";
import ListComments from "../../components/ListComments/ListComments";
import styles from "./Project.module.scss";

const ADMIN = "admin";

const Project = ({
  project,
  comments,
  currentUser,
  users,
  projectUser,
  getProject,
  getUsers,
  addProjectUser,
  updateProj,
  deleteProjectUserAll,
  getProjectUser,
  addComment,
  getComments,
}) => {
  const history = useHistory();
  const params = useParams();

  const [personName, setPersonName] = useState([]);
  const [commentsProject, setCommentsProject] = useState([]);

  useEffect(() => {
    setCommentsProject(comments.data);
  }, [comments]);

  let formInputsProject = [
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
  let formInputsProjectNew = [];
  if (project.data.name) {
    const dateStart = project.data.date_start.slice(0, 10);
    const dateFinish = project.data.date_finish
      ? project.data.date_finish.slice(0, 10)
      : "";
    formInputsProjectNew = [
      {
        type: "text",
        value: project.data.name,
        name: "name",
        label: "Name",
        check: "isEmpty",
      },
      {
        type: "date",
        value: dateStart,
        name: "dateStart",
        label: "Start date",
        check: "isEmpty",
      },
      {
        type: "date",
        value: dateFinish,
        name: "dateFinish",
        label: "End date",
        check: "isNotCheck",
      },
    ];
  }
  useEffect(() => {
    getProject(params.id);
    getUsers();
    getComments(params.id);
    getProjectUser(params.id);
  }, []);

  useEffect(() => {
    setPersonName([]);
    let listUsers = [];
    const listUserIds = projectUser.data.map((item) => item.id_user);
    users.data.forEach((item) => {
      if (listUserIds.includes(item.id)) {
        listUsers.push(item.username);
      }
    });
    if (listUsers.join() !== personName.join() && personName.length === 0) {
      setPersonName(listUsers);
    }
  }, [projectUser]);

  useEffect(() => {
    if (project.data.name) {
      setFormStateInputs(
        formInputsProjectNew.reduce((obj, input) => {
          obj[input.name] = { value: input.value, isValid: true };
          return obj;
        }, {})
      );
    }
  }, [project]);

  const [formIsValid, setFormIsValid] = useState(false);
  const [commentIsValid, setCommentIsValid] = useState(false);

  const [commentState, setCommentState] = useState({
    value: "",
    isValid: false,
  });

  const [formStateInputs, setFormStateInputs] = useState(
    formInputsProject.reduce((obj, input) => {
      obj[input.name] = { value: input.value, isValid: true };
      return obj;
    }, {})
  );

  const onChangeInput = (inputName, isValid, value) => {
    setFormStateInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: { value: value, isValid: isValid },
    }));
  };

  useEffect(() => {
    const isValidForm = Object.values(formStateInputs)
      .map((input) => input.isValid)
      .reduce((isValid, nextIsValid) => {
        return isValid && nextIsValid;
      }, true);

    setFormIsValid(isValidForm);
  }, [formStateInputs]);

  const getPersonIds = (personName) => {
    const userIds = [];
    users.data.forEach((item) => {
      if (personName.includes(item.username)) {
        userIds.push(item.id);
      }
    });
    return userIds;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newProject = {
      name: formStateInputs.name.value,
      date_start: formStateInputs.dateStart.value,
      date_finish: formStateInputs.dateFinish.value,
    };

    updateProj(project.data.id, newProject);
  };

  const updateProjectUsers = () => {
    const personIds = getPersonIds(personName);
    deleteProjectUserAll(project.data.id);
    personIds.map((userId) => addProjectUser(project.data.id, userId));
    getProjectUser(params.id);
    window.location.reload();
  };

  const addCommentHandler = () => {
    const comment = {
      id_project: project.data.id,
      id_user: currentUser.data.id,
      comment: commentState.value,
    };
    addComment(comment);
    setCommentState({ value: "", isValid: false });
    window.location.reload();
  };

  const onChangeInputComment = (inputName, isValid, value) => {
    setCommentState({ value: value, isValid: isValid });
  };

  return (
    <div className={styles.form}>
      <div className={styles.item}>
        <h2>Comments</h2>
        {commentsProject.length !== 0 && <ListComments comments={commentsProject} />}
      </div>
      <div>
        <Stack direction="column" spacing={3} alignItems="center">
          {project.data.name &&
            formInputsProject.map((input, item) => (
              <div key={item}>
                {input.type !== "date" ? (
                  <CustomTextField
                    label={input.label}
                    type={input.type}
                    name={input.name}
                    enteredValue={formStateInputs[input.name].value}
                    typeCheck={input.check}
                    onChangeInput={onChangeInput}
                    disabled={currentUser.data.role !== ADMIN}
                  />
                ) : (
                  <CustomDateField
                    label={input.label}
                    type={input.type}
                    name={input.name}
                    enteredValue={formStateInputs[input.name].value}
                    typeCheck={input.check}
                    onChangeInput={onChangeInput}
                    disabled={currentUser.data.role !== ADMIN}
                  />
                )}
              </div>
            ))}
          {currentUser.data.role === ADMIN && (
            <CustomButton
              label="update project"
              onClick={submitHandler}
              disabled={!formIsValid}
            />
          )}

          <ListUsers userName={personName} setUserName={setPersonName} />
          {currentUser.data.role === ADMIN && (
            <CustomButton
              label="update project users"
              onClick={updateProjectUsers}
              disabled={false}
            />
          )}
          {currentUser.data.role === ADMIN && (
            <>
              <CustomTextField
                label="Comment"
                type="text"
                name="comment"
                enteredValue={commentState.value}
                typeCheck="isEmpty"
                onChangeInput={onChangeInputComment}
              />
              <CustomButton
                label="add comment"
                onClick={addCommentHandler}
                disabled={!commentState.isValid}
              />
            </>
          )}
        </Stack>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project,
  comments: state.comments,
  currentUser: state.currentUser,
  users: state.users,
  projectUser: state.projectUser,
});

const mapDispatchToProps = {
  getProject: fetchProject,
  getUsers: fetchUsers,
  getProjectUser: fetchProjectUserByIdProject,
  addProjectUser: createProjectUser,
  updateProj: updateProject,
  deleteProjectUserAll: deleteProjectUser,
  addComment: createComments,
  getComments: fetchCommentsByIdProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
