import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import CardUser from "../../components/CardUser";
import ListProjects from "../../components/ListProjects";
import CustomButton from "../../components/CustomButton";
import { fetchUser } from "../../redux/actions/oneUserActions";
import { fetchProjects } from "../../redux/actions/projectsActions";
import {
  fetchProjectUserByIdUser,
  createProjectUser,
  deleteUserProject,
} from "../../redux/actions/projectUserActions";
import { updateProject } from "../../redux/actions/projectsActions";
import withLoadingDelay from '../../HOCS/WithLoadingDelay';

import styles from "./User.module.scss";

const User = ({
  user,
  projects,
  projectUser,
  getUser,
  getProjects,
  addProjectUser,
  deleteUserProjectAll,
  getProjectUser,
}) => {
  const history = useHistory();
  const params = useParams();

  const [projectName, setProjectName] = useState([]);

  useEffect(() => {
    getUser(params.id);
    getProjects();
    getProjectUser(params.id);
  }, []);

  useEffect(() => {
    setProjectName([]);
    let listProjects = [];
    const listProjectIds = projectUser.data.map((item) => item.id_project);
    projects.data.forEach((item) => {
      if (listProjectIds.includes(item.id)) {
        listProjects.push(item.name);
      }
    });
    if (
      listProjects.join() !== projectName.join() &&
      projectName.length === 0
    ) {
      setProjectName(listProjects);
    }
  }, [projectUser]);

  const getProjectIds = (projectName) => {
    const projectIds = [];
    projects.data.forEach((item) => {
      if (projectName.includes(item.name)) {
        projectIds.push(item.id);
      }
    });
    return projectIds;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const projectIds = getProjectIds(projectName);

    deleteUserProjectAll(user.data.id);
    projectIds.map((projectId) => addProjectUser(projectId, user.data.id));
    getProjectUser(params.id);
  };

  return (
    <div className={styles.container}>
      <CardUser content={user.data} />
      <ListProjects userName={projectName} setUserName={setProjectName} />
      <CustomButton
        label="update user projects"
        onClick={submitHandler}
        disabled={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  projects: state.projects,
  projectUser: state.projectUser,
});

const mapDispatchToProps = {
  getUser: fetchUser,
  getProjects: fetchProjects,
  getProjectUser: fetchProjectUserByIdUser,
  addProjectUser: createProjectUser,
  updateProj: updateProject,
  deleteUserProjectAll: deleteUserProject,
};
export const UserWithDelay = withLoadingDelay(User);
export default connect(mapStateToProps, mapDispatchToProps)(UserWithDelay);
