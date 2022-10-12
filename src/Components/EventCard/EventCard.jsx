// React and Material UI
import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Link from "@mui/material/Link";
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
  author,
  key,
  title,
  description,
  startDate,
  theme,
  // duration,
  // tags,
}) => (
  <Grid className={`EventCard-${theme}`} key={key}>
    <Grid className="ExpositorInfo">
      <Grid className="UserPhotoAndName">
        <img
          className="UserPhoto"
          src={`http://localhost:2424/${author.profilePicture}`}
          alt="User_photo"
        />
        <Typography className="UserName">
          {author.firstName} {author.lastName}
        </Typography>
      </Grid>
      <Typography className="UserDesc">{author.description}</Typography>
      <Grid className="UserSocialMedia">
        {author.twitter && (
          <Link underline="none" target="_blank" href={`https://www.twitter.com/${author.twitter}`}>
            <Button className="SocialMediaButton">
              <Twitter />
            </Button>
          </Link>
        )}
        {author.facebook && (
          <Link
            underline="none"
            target="_blank"
            href={`https://www.facebook.com/${author.facebook}`}
          >
            <Button className="SocialMediaButton">
              <Facebook />
            </Button>
          </Link>
        )}
        {author.github && (
          <Link underline="none" target="_blank" href={`https://www.github.com/${author.github}`}>
            <Button className="SocialMediaButton">
              <GitHub />
            </Button>
          </Link>
        )}
        {author.linkedin && (
          <Link
            underline="none"
            target="_blank"
            href={`https://www.linkedin.com/${author.linkedin}`}
          >
            <Button className="SocialMediaButton">
              <LinkedIn />
            </Button>
          </Link>
        )}
        {author.website && (
          <Link underline="none" target="_blank" href={author.website}>
            <Button className="SocialMediaButton">
              <LanguageTwoTone />
            </Button>
          </Link>
        )}
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
          <Typography className="EventHour">
            {startDate.toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
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
