import { Grid, Typography } from "@material-ui/core";

import "./LearningCard.scss";

const LearningCard = ({ title, subtitle, description, preview, theme = "Theme_03" }) => {
  return (
    <Grid className="MainContainer">
      <Grid className={`LearningCard-${theme}`}>
        <img src={preview} alt={title} className="LearningCardPreview" />
        <Grid container>
          <Grid item xs={6} className="LearningCardTitles">
            <Typography className="Title">{title}</Typography>
            <Typography className="Subtitle">{subtitle}</Typography>
          </Grid>
          <Grid item xs={6} className="LearningCardDescription">
            <Typography>{description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LearningCard;
