import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const DoctorPanel = () => {
  return (
    <div>
      <Card sx={{ maxWidth: 345, maxheight: 500 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            alt="green iguana"
            sx={{ margin: "2rem" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Brajesh Mishra
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Department : Eye
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Speciality :Cardiologist
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CHARGE : 500
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default DoctorPanel;
