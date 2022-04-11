import React from "react";
import { connect } from "react-redux";

import { fetchUsers, deleteUser } from "../../redux/actions/usersActions";
import styles from "./Users.module.scss";
import EnhancedTable from "../../components/table/EnhancedTable";

const Users = ({ users, getUsers, deleteUsers }) => {
  React.useEffect(() => {
    getUsers();
  }, []);

  console.log(users.data);
  return (
    <div style={{ width: "800px", display: "block", margin: "0 auto" }}>
      <div style={{ height: 400, width: "100%" }}>
        <EnhancedTable rows={users.data} deleteHandler={deleteUsers} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  deleteUsers: deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
