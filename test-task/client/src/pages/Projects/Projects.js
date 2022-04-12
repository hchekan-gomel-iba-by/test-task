import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "../../components/Card";
import CustomButton from "../../components/CustomButton";
import { fetchProjects } from "../../redux/actions/projectsActions";
import { fetchProjectUserByIdUser } from "../../redux/actions/projectUserActions";
import styles from "./Projects.module.scss";

const ADMIN = "admin";

const Projects = ({
  projectUser,
  projects,
  currentUser,
  getProjects,
  getProjectByUser,
}) => {
  const history = useHistory();

  React.useEffect(() => {
    getProjects();
    if (currentUser.data.role !== ADMIN) {
      getProjectByUser(currentUser.data.id);
    }
  }, []);

  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    setUserProjects(projects.data.map((item) => item.id));
    if (currentUser.data.role !== ADMIN) {
      setUserProjects(projectUser.data.map((item) => item.id_project));
    }
  }, [projectUser, projects]);

  const addProjectHandler = () => {
    history.replace("/addProject");
  };

  return (
    <div style={{ display: "block", margin: "30px" }}>
      {currentUser.data.role === ADMIN && (
        <CustomButton label="add project" onClick={addProjectHandler} />
      )}
      <div className={styles.centered}>
        {projects.data.map((item) => {
          if (userProjects.includes(item.id)) {
            return <Card key={item.id} content={item} />;
          }
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projectUser: state.projectUser,
  projects: state.projects,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  getProjects: fetchProjects,
  getProjectByUser: fetchProjectUserByIdUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
