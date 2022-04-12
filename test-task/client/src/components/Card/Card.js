import * as React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

import {
  updateProject,
  deleteProject,
} from "../../redux/actions/projectsActions";
import { deleteCommentsByIdProject } from "../../redux/actions/commentsActions";
import { deleteProjectUser } from "../../redux/actions/projectUserActions";

const ADMIN = "admin";

const CardProject = ({
  currentUser,
  content,
  updateProj,
  deleteProj,
  deleteComments,
  deleteUserFromProject,
}) => {
  const history = useHistory();
  const openProjectHandler = () => {
    history.replace(`/project/${content.id}`);
  };
  const cancelProjectHandler = () => {
    const project = {
      name: content.name,
      date_start: content.date_start,
      date_finish: new Date(),
    };
    updateProj(content.id, project);
  };

  const deleteProjectHandler = () => {
    deleteComments(content.id);
    deleteUserFromProject(content.id);
    deleteProj(content.id);
  };
  return (
    <Box sx={{ minWidth: 270, margin: 1.5 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {content.name}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              Start date: {content.date_start}
            </Typography>
            <Typography sx={{ mb: 1 }} color="text.secondary">
              End date: {content.date_finish ? content.date_finish : "opened"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={openProjectHandler}>
              More
            </Button>
            {!content.date_finish && currentUser.data.role === ADMIN && (
              <Button size="small" onClick={cancelProjectHandler}>
                Cancel
              </Button>
            )}
            {currentUser.data.role === ADMIN && (
              <Button size="small" onClick={deleteProjectHandler}>
                Delete
              </Button>
            )}
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  currentUser: state.currentUser,
});

const mapDispatchToProps = {
  updateProj: updateProject,
  deleteProj: deleteProject,
  deleteComments: deleteCommentsByIdProject,
  deleteUserFromProject: deleteProjectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardProject);
