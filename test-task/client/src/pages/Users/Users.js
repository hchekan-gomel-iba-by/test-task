import React from "react";
import { connect } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useHistory } from "react-router-dom";

import CustomButton from "../../components/CustomButton";
import { fetchUsers, deleteUser } from "../../redux/actions/usersActions";
import { deleteCommentsByIdUser } from "../../redux/actions/commentsActions";
import { deleteUserProject } from "../../redux/actions/projectUserActions";

const Users = ({
  users,
  currentUser,
  getUsers,
  deleteUsers,
  deleteComments,
  deleteUserFromProjects,
}) => {
  React.useEffect(() => {
    getUsers();
  }, []);
  const history = useHistory();

  const [checked, setChecked] = React.useState([]);

  const onDelete = () => {
    checked.forEach((item) => {
      deleteComments(item);
      deleteUserFromProjects(item);
      deleteUsers(item);
    });
    setChecked([]);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const openUserHandler = (id) => {
    history.replace(`/user/${id}`);
  };

  return (
    <div style={{ width: "800px", display: "block", margin: "30px" }}>
      <CustomButton label="delete users" onClick={onDelete} />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.data.map((value) => {
          if (value.id !== currentUser.data.id) {
            const labelId = `checkbox-list-label-${value.username}`;

            return (
              <ListItem
                key={value.username}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => openUserHandler(value.id)}
                  >
                    <InfoIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(value)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.username} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  getUsers: fetchUsers,
  deleteUsers: deleteUser,
  deleteComments: deleteCommentsByIdUser,
  deleteUserFromProjects: deleteUserProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
