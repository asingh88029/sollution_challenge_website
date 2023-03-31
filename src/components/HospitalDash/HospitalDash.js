import React from "react";
import { Drawer, Typography, IconButton } from "@mui/material";
import { useRef, useState, useEffect, useContext } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AnalyticList from "../Analytic/AnalyticList/AnalyticList";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { Link } from "react-router-dom";
const HospitalDash = () => {
  const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
  const profitLossDetails = [
    { category: "Yet To Serve(Today)", percentage: 308 },
    { category: "Served Yet(Today)", percentage: 48 },
    { category: "Last Month Count", percentage: 48009 },
    {
      category: "Total Served Patient Count",

      percentage: 34489009,
    },
  ];
  return (
    //<div style="min-height: 600px">
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="logo"
        onClick={() => setIsDrawerOpen(true)}
      >
        <Typography sx={{ paddingLeft: "0rem", marginTop: "0rem","@media screen and (max-width:780px)":{
          marginTop:"3rem",
          marginLeft:"10px"
        } }}>
          <MenuIcon />
        </Typography>
        {/* <ArrowForwardIosIcon sx={{ marginTop: "4rem" }} /> */}
      </IconButton>
      <Drawer
        anchor="left"
        open={IsDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        PaperProps={{
          sx: {
            width: "300px",
            "@media screen and (min-width: 780px)": {
              width: "15%",
              
            },
            "@media screen and (max-width:780px)":{
              marginTop:"13 0px"
            },
            marginTop: "60px",
          },
        }}
        BackdropProps={{ invisible: true }}
      >
        <List>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>

              <Link to={`/hospital/update`}>
                <ListItemText primary="Update Details" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VaccinesIcon />
              </ListItemIcon>
              <Link to={`/hospital/doctor`}>
                <ListItemText primary="Doctor" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Patient" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <div className="analytics">
        <AnalyticList items={profitLossDetails} />
      </div>
    </div>
  );
};

export default HospitalDash;




// const HospitalDash=()=>{
//   return <>
//     <div className=""></div>
//   </>
// }
// export default HospitalDash;