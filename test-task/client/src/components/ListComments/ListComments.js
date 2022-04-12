import * as React from "react";
import { connect } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

const ListProjects = ({ comments, users }) => {
  const [commentsData, setCommentsData] = React.useState([]);
  React.useEffect(() => {
    if (users.length !== 0) {
      setCommentsData(
        comments.length !== 0
          ? comments.map((comment) => ({
              username: users.find((item) => item.id === comment.id_user)
                .username,
              commentText: comment.comment,
            }))
          : []
      );
    }
  }, [comments, users]);

  return (
    <List sx={{ width: "100%", minWidth: "100%", bgcolor: "background.paper" }}>
      {commentsData.map((comment) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={comment.username}
              secondary={comment.commentText}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.data,
});

export default connect(mapStateToProps)(ListProjects);
