import { useState } from "react";
import {
  ClickAwayListener,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import "./UserSmallCard.scss";

const UserSmallCard = ({ name, profilePic }) => {
  const [username, setUsername] = useState("Octaviotastico");
  const [usernameEdit, setUsernameEdit] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className="UserSmallCard">
        <Grid className="Button" onClick={() => setOpen(!open)}>
          <Grid item xs={8} className="Text">
            <Typography className="UserName">{name}</Typography>
            <Typography className="Subtitle">Profile</Typography>
          </Grid>
          <Grid item xs={4} className="Picture">
            <img className="ProfilePic" src={profilePic} alt="ME" />
          </Grid>
        </Grid>

        {open && (
          <Grid className="SmallCardContent">
            <Grid className="TitleContainer">
              <img src="/icons/configs.svg" className="Icons" alt="Configs" />
              <Typography className="Title">Account</Typography>
            </Grid>
            <Grid>
              <Input
                label="Username"
                value={username}
                onChange={(e) => {
                  if (usernameEdit) setUsername(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setUsernameEdit(!usernameEdit)}
                      style={
                        usernameEdit ? { backgroundColor: "#AAAAAA" } : null
                      }
                    >
                      <img src="/icons/edit.svg" alt="Edit" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>

            <Grid className="TitleContainer">
              <img src="/icons/settings.svg" className="Icons" alt="Configs" />
              <Typography className="Title">Settings</Typography>
            </Grid>

            <Grid className="TitleContainer">
              <img src="/icons/logout.svg" className="Icons" alt="Configs" />
              <Typography className="Title">Logout</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default UserSmallCard;
