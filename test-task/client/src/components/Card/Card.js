import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

const CardProject = ({ content }) => {
  const history = useHistory();
  const openProjectHandler = () => {
    history.replace(`/project/${content.id}`);
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
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
};

export default CardProject;
