// React
import React, { useEffect, useState } from "react";

// Material
import { ClickAwayListener, Grid, Typography } from "@material-ui/core";
import { AccountCircleTwoTone, SettingsTwoTone, ExitToAppTwoTone } from "@mui/icons-material";

// Redux
import { useSelector } from "react-redux";

// API
import { API_URL } from "../../Utils/constants";
import { getMyData } from "../../API/user";

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
  sessionStorage.removeItem("token");
  navigate("/login");
};

const UserSmallCard = () => {
  const { theme } = useSelector((state) => state);
  const [userData, setUserData] = useState({});
  const [open, setOpen] = useState(false);

  // Get user data
  useEffect(() => {
    getMyData().then((res) => {
      setUserData(res);
    });
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className={`UserSmallCard-${theme}`}>
        <Grid className="Button" onClick={() => setOpen(!open)}>
          <Grid className="Text">
            <Typography className="UserName">{userData.username}</Typography>
            <Typography className="Subtitle">Profile</Typography>
          </Grid>
          <Grid className="Picture">
            {userData.profilePicture && (
              <img
                className="ProfilePic"
                src={`${API_URL}/${userData.profilePicture}`}
                alt="My picture"
                onError={(event) => {
                  event.target.style.display = "none";
                }}
              />
            )}
            {!userData.profilePicture && <AccountCircleTwoTone className="ProfilePic" />}
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
