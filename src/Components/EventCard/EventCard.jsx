// React and Material UI
import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import {
  ConfirmationNumberTwoTone,
  LanguageTwoTone,
  LaunchRounded,
  LinkedIn,
  GitHub,
  Facebook,
  Twitter,
} from "@mui/icons-material";

// Utils
import { monthShort } from "../../Utils/constants";

// Styles
import "./EventCard.scss";

const EventCard = ({
  title,
  description,
  startDate,
  theme, // endDate
}) => (
  <Grid className={`EventCard-${theme}`}>
    <Grid className="ExpositorInfo">
      <Grid className="UserPhotoAndName">
        <img className="UserPhoto" src="/images/mock/user.jpg" alt="User_photo" />
        <Typography className="UserName">Juan A. Fraire</Typography>
      </Grid>
      <Typography className="UserDesc">Specialist on Networks</Typography>
      <Grid className="UserSocialMedia">
        <Button className="SocialMediaButton">
          <Twitter />
        </Button>
        <Button className="SocialMediaButton">
          <Facebook />
        </Button>
        <Button className="SocialMediaButton">
          <GitHub />
        </Button>
        <Button className="SocialMediaButton">
          <LinkedIn />
        </Button>
        <Button className="SocialMediaButton">
          <LanguageTwoTone />
        </Button>
      </Grid>
    </Grid>

    <Grid className="EventInfo">
      <Grid className="EventInfoContainer">
        <Grid className="EventPreviewContainer">
          <img className="EventPreview" src="/images/mock/dtn.jpg" alt="Event_photo" />
        </Grid>

        <Grid className="EventDateContainer">
          <Typography className="EventDate">
            {startDate.getDate() < 10 && "0"}
            {startDate.getDate()}
          </Typography>
          <Typography className="EventMonth">
            {monthShort[startDate.getMonth()]} {startDate.getFullYear()}
          </Typography>
        </Grid>

        <Grid className="EventTextContainer">
          <Typography className="EventTitle">{title}</Typography>
          <Typography className="EventDesc">{description}</Typography>
        </Grid>
      </Grid>

      <Grid className="EventActions">
        <Button className="EventButton">
          <ConfirmationNumberTwoTone />
        </Button>
        <Button className="EventButton">
          <LaunchRounded />
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

export default EventCard;
