import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import image from "../../assets/iguana.jpg";

export default function CardUser({ content }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "20px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt="green iguana"
        />
        <CardContent sx={{ textAlign: "left" }}>
          <Typography gutterBottom variant="h5" component="div">
            {content.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            email: {content.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            password: {content.password}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            role: {content.role}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
