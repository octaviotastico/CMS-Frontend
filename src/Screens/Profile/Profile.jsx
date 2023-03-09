// React
import React, { useEffect, useState } from "react";

// Material
import {
  AccountCircleTwoTone,
  EditTwoTone,
  GitHub,
  LinkedIn,
  Facebook,
  Twitter,
  LanguageTwoTone,
  SegmentTwoTone,
  EmailTwoTone,
} from "@mui/icons-material";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";

// Redux
import { useSelector } from "react-redux";

// Api
import { getMyData, updateProfile } from "../../API/user";
import { API_URL } from "../../Utils/constants";

// Components
import PDropzone from "../../Components/PDropzone/PDropzone";
import PTextInput from "../../Components/PTextInput/PTextInput";
import PButton from "../../Components/PButton/PButton";

// Styles
import "./Profile.scss";

const handleProfilePictureUpdate = async (newProfilePicture, setOpen, setErrors) => {
  if (!newProfilePicture) {
    console.log("No picture selected");
    return;
  }

  const response = await updateProfile({ profilePicture: newProfilePicture });

  if (response) setOpen(false);
  else setErrors((prev) => ({ ...prev, profilePicture: true }));
};

const handleCloseSnackbar = (event, reason, setSnackbarOpen) => {
  if (reason === "clickaway") {
    return;
  }

  setSnackbarOpen(false);
};

const handleProfileChanges = async (setApiUserData, propName, newValue, setSnackbarOpen) => {
  const response = await updateProfile({ [propName]: newValue });
  setApiUserData((prev) => ({ ...prev, [propName]: newValue }));
  setSnackbarOpen(true);

  if (!response) {
    console.log("Error updating profile");
  }
};

const Profile = () => {
  const { theme } = useSelector((state) => state);
  const [apiUserData, setApiUserData] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userHasPicture, setUserHasPicture] = useState(true);

  // Get user data
  useEffect(() => {
    getMyData().then((res) => {
      setApiUserData(res);
    });
  }, []);

  return (
    <Container maxWidth={false} className={`ProfileScreen-${theme}`}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={(...params) => handleCloseSnackbar(...params, setSnackbarOpen)}
        message="Changes to profile saved!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{ fontFamily: "Poppins" }}
      />

      <Grid className="ProfilePictureContainer">
        <img
          src={`${API_URL}/${apiUserData.profilePicture?.replaceAll("\\", "/")}`}
          className="ProfilePicture"
          alt="profilePicture"
          onError={(event) => {
            setUserHasPicture(false);
            event.target.style.display = "none";
          }}
        />
        {!userHasPicture && <AccountCircleTwoTone className="ProfilePicture" />}
        <Grid className="ProfilePictureOverlay" onClick={() => setOpen(true)}>
          <Typography className="ProfileText" style={{ fontSize: 15, color: "white" }}>
            <EditTwoTone /> Change profile picture
          </Typography>
        </Grid>
      </Grid>

      <Grid className="ProfileSection">
        <Typography className="SectionTitle">Basic Information</Typography>
        <Typography className="ProfileText">
          <AccountCircleTwoTone /> {apiUserData.firstName} {apiUserData.lastName} (@
          {apiUserData.username})
        </Typography>
        <Typography className="ProfileText">
          <EmailTwoTone /> {apiUserData.email}
        </Typography>
      </Grid>

      <Grid className="ProfileSection">
        <Typography className="SectionTitle">Extra Information</Typography>
        <PTextInput
          isMultiline
          icon={<SegmentTwoTone />}
          fieldName="Presentation"
          value={apiUserData.description}
          setValue={(e) => setApiUserData((prev) => ({ ...prev, description: e }))}
          onBlur={(e) =>
            handleProfileChanges(setApiUserData, "description", e.target.value, setSnackbarOpen)
          }
        />
      </Grid>

      <Grid className="ProfileSection" style={{ display: "flex", gap: 10 }}>
        <Typography className="SectionTitle">Social Networks</Typography>
        <PTextInput
          fieldName="Twitter"
          icon={<Twitter />}
          value={apiUserData.twitter}
          setValue={(e) => setApiUserData((prev) => ({ ...prev, twitter: e }))}
          onBlur={(e) =>
            handleProfileChanges(setApiUserData, "twitter", e.target.value, setSnackbarOpen)
          }
        />
        <PTextInput
          fieldName="Facebook"
          icon={<Facebook />}
          value={apiUserData.facebook}
          setValue={(e) => setApiUserData((prev) => ({ ...prev, facebook: e }))}
          onBlur={(e) =>
            handleProfileChanges(setApiUserData, "facebook", e.target.value, setSnackbarOpen)
          }
        />
        <PTextInput
          fieldName="Github"
          icon={<GitHub />}
          value={apiUserData.github}
          setValue={(e) => setApiUserData((prev) => ({ ...prev, github: e }))}
          onBlur={(e) =>
            handleProfileChanges(setApiUserData, "github", e.target.value, setSnackbarOpen)
          }
        />
        <PTextInput
          fieldName="Linkedin"
          icon={<LinkedIn />}
          value={apiUserData.linkedin}
          setValue={(e) => setApiUserData((prev) => ({ ...prev, linkedin: e }))}
          onBlur={(e) =>
            handleProfileChanges(setApiUserData, "linkedin", e.target.value, setSnackbarOpen)
          }
        />
        <PTextInput
          fieldName="Website"
          icon={<LanguageTwoTone />}
          value={apiUserData.website}
          setValue={(e) => setApiUserData((prev) => ({ ...prev, website: e }))}
          onBlur={(e) =>
            handleProfileChanges(setApiUserData, "website", e.target.value, setSnackbarOpen)
          }
        />
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update profile picture</DialogTitle>
        <DialogContent>
          <PDropzone setSelectedFile={setNewProfilePicture} acceptImages />
          {errors.profilePicture && (
            <Typography color="error">Error updating profile picture</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <PButton text="Cancel" action={() => setOpen(false)} theme={theme} />
          <PButton
            text="Update"
            action={() => handleProfilePictureUpdate(newProfilePicture, setOpen, setErrors)}
            theme={theme}
          />
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
