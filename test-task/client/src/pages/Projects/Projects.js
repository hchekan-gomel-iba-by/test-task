import { Button } from "@mui/material";
import React from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import { fetchProjects } from '../../redux/actions/projectsActions';
import styles from "./Projects.module.scss";

const Projects = ({ projects, getProjects }) => {
  const history = useHistory();

  React.useEffect(() => {
    getProjects();
  }, []);

  const addProjectHandler = () => {
    history.replace("/addProject");
  }

  return (
    <div>
      <CustomButton label="add project" onClick={addProjectHandler} />
      <div className={styles.centered}>
        {projects.data.map(item => <Card key={item.id} content={item} />)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = {
  getProjects: fetchProjects
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
