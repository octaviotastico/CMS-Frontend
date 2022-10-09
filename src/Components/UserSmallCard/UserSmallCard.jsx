// React
import React, { useEffect, useState } from "react";

// Libraries
import jwt from "jwt-decode";

// Material
import { ClickAwayListener, Grid, Typography } from "@material-ui/core";

// Styles
import "./UserSmallCard.scss";

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
          <Grid item xs={8} className="Text">
            <Typography className="UserName">{username}</Typography>
            <Typography className="Subtitle">Profile</Typography>
          </Grid>
          <Grid item xs={4} className="Picture">
            <img className="ProfilePic" src={profilePic} alt="ME" />
          </Grid>
        </Grid>

        {open && (
          <Grid className="FloatingMenu">
            <Grid className="TitleContainer">
              <img src="/icons/profile.svg" className="Icons" alt="Profile" />
              <Typography className="Title">Profile</Typography>
            </Grid>

            <Grid className="TitleContainer">
              <img src="/icons/settings.svg" className="Icons" alt="Settings" />
              <Typography className="Title">Settings</Typography>
            </Grid>

            <Grid className="TitleContainer">
              <img src="/icons/logout.svg" className="Icons" alt="Logout" />
              <Typography className="Title">Log out</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default UserSmallCard;
