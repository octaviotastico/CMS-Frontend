// React and Material UI
import { Button, Grid, Typography } from "@material-ui/core";
import { LanguageTwoTone, LaunchRounded, GitHub, LinkedIn, Facebook, Twitter } from '@material-ui/icons';

// Styles
import "./EventCard.scss";

const EventCard = ({ title, description, theme }) => {
  return (
    <Grid className={`EventCard-${theme}`}>

      <Grid className={`ExpositorInfo-${theme}`}>
        <Grid className="UserPhotoAndName">
          <img className="UserPhoto" src="/images/mock/user.jpg" alt="User_photo" />
          <Typography className={`UserName-${theme}`}>Juan A. Fraire</Typography>
        </Grid>
        <Typography className={`UserDesc-${theme}`}>Specialist on Networks</Typography>
        <Grid className="UserSocialMedia">
          <Button className={`SocialMediaButton-${theme}`}>
            <Twitter />
          </Button>
          <Button className={`SocialMediaButton-${theme}`}>
            <Facebook />
          </Button>
          <Button className={`SocialMediaButton-${theme}`}>
            <GitHub />
          </Button>
          <Button className={`SocialMediaButton-${theme}`}>
            <LinkedIn />
          </Button>
          <Button className={`SocialMediaButton-${theme}`}>
            <LanguageTwoTone />
          </Button>
        </Grid>
      </Grid>

      <Grid className={`EventInfo-${theme}`}>
        <Grid className="EventPreviewContainer">
          <img className="EventPreview" src="/images/mock/dtn.jpg" alt="Event_photo" />
        </Grid>
        <Grid className="EventTextContainer">
          <Typography className={`EventTitle EventTitle-${theme}`}>{title}</Typography>
          <Typography className={`EventDesc EventDesc-${theme}`}>{description}</Typography>
        </Grid>
        <Grid className="EventActions">
          <Button className={`EventButton-${theme}`}>
            <LaunchRounded />
          </Button>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default EventCard;
