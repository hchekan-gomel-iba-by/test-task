import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "../../components/Card";
import ListUsers from "../../components/ListUsers/ListUsers";
import CustomButton from "../../components/CustomButton";
import { fetchProject } from "../../redux/actions/oneProjectActions";
import styles from "./Project.module.scss";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../../redux/actions/usersActions";

const Project = ({ project, users, getProject, getUsers }) => {
  const history = useHistory();
  const params = useParams();

  const listUsers = project.data.list_users ? project.data.list_users.split(',') : [];
  const [personName, setPersonName] = React.useState(listUsers);

  React.useEffect(() => {
    getProject(params.id);
    getUsers();
  }, []);

  return (
    <div>
      <div className={styles.centered}>
        <Card content={project.data} />
      </div>
      <ListUsers userName={personName} setUserName={setPersonName}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project,
  users: state.users,
});

const mapDispatchToProps = {
  getProject: fetchProject,
  getUsers: fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
