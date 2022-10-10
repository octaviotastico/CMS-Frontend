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

// Components
import PDropzone from "../../Components/PDropzone/PDropzone";
import PTextInput from "../../Components/PTextInput/PTextInput";

// Styles
import "./Profile.scss";
import PButton from "../../Components/PButton/PButton";

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

const Profile = () => {
  const { theme } = useSelector((state) => state);
  const [apiUserData, setApiUserData] = useState({});
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Get user data
  useEffect(() => {
    getMyData().then((res) => {
      setApiUserData(res);
    });
  }, []);

  console.log({ apiUserData });

  return (
    <Container maxWidth={false} className={`ProfileScreen-${theme}`}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={(...params) => handleCloseSnackbar(...params, setSnackbarOpen)}
        message="Changes to profile saved!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{ fontFamily: "Poppins" }}
      />

      <Grid className="ProfilePictureContainer">
        <img
          src={`http://localhost:2424/${apiUserData.profilePicture?.replaceAll("\\", "/")}`}
          className="ProfilePicture"
          alt="profilePicture"
        />
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
          setValue={(newDescription) =>
            setApiUserData((prev) => ({ ...prev, description: newDescription }))
          }
          onBlur={() => setSnackbarOpen(true)}
        />
      </Grid>

      <Grid className="ProfileSection" style={{ display: "flex", gap: 10 }}>
        <Typography className="SectionTitle">Social Networks</Typography>
        <PTextInput
          fieldName="Twitter"
          icon={<Twitter />}
          value={apiUserData.twitter}
          setValue={(newTwitter) => setApiUserData((prev) => ({ ...prev, twitter: newTwitter }))}
          onBlur={() => setSnackbarOpen(true)}
        />
        <PTextInput
          fieldName="Facebook"
          icon={<Facebook />}
          value={apiUserData.facebook}
          setValue={(newFacebook) => setApiUserData((prev) => ({ ...prev, facebook: newFacebook }))}
        />
        <PTextInput
          fieldName="Github"
          icon={<GitHub />}
          value={apiUserData.github}
          setValue={(newGitHub) => setApiUserData((prev) => ({ ...prev, github: newGitHub }))}
        />
        <PTextInput
          fieldName="Linkedin"
          icon={<LinkedIn />}
          value={apiUserData.linkedin}
          setValue={(newLinkedIn) => setApiUserData((prev) => ({ ...prev, linkedin: newLinkedIn }))}
        />
        <PTextInput
          fieldName="Website"
          icon={<LanguageTwoTone />}
          value={apiUserData.website}
          setValue={(newWebsite) => setApiUserData((prev) => ({ ...prev, website: newWebsite }))}
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
