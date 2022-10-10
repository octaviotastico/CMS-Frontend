// React
import React, { useEffect, useState } from "react";

// Libraries
import jwt from "jwt-decode";

// Material
import { ClickAwayListener, Grid, Typography } from "@material-ui/core";
import { AccountCircleTwoTone, SettingsTwoTone, ExitToAppTwoTone } from "@material-ui/icons";

// Router
import { navigate } from "../../Router";

// Styles
import "./UserSmallCard.scss";

const handleProfile = (setOpen) => {
  setOpen(false);
  navigate("/profile");
};

const handleLogout = (setOpen) => {
  setOpen(false);
  localStorage.removeItem("token");
  navigate("/login");
};

const UserSmallCard = ({ profilePic }) => {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const userData = jwt(sessionStorage.getItem("token"));
      setUsername(userData.username);
    } catch (error) {
      console.log({ error });
      setUsername("");
    }
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className="UserSmallCard">
        <Grid className="Button" onClick={() => setOpen(!open)}>
          <Grid className="Text">
            <Typography className="UserName">{username}</Typography>
            <Typography className="Subtitle">Profile</Typography>
          </Grid>
          <Grid className="Picture">
            <img className="ProfilePic" src={profilePic} alt="ME" />
          </Grid>
        </Grid>

        {open && (
          <Grid className="FloatingMenu">
            <Grid className="TitleContainer" onClick={() => handleProfile(setOpen)}>
              <AccountCircleTwoTone className="Icons" />
              <Typography className="Title">Profile</Typography>
            </Grid>

            <Grid className="TitleContainer">
              <SettingsTwoTone className="Icons" />
              <Typography className="Title">Settings</Typography>
            </Grid>

            <Grid className="TitleContainer" onClick={() => handleLogout(setOpen)}>
              <ExitToAppTwoTone className="Icons" />
              <Typography className="Title">Log out</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default UserSmallCard;
