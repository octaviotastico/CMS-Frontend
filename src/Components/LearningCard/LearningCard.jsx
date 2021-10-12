// React
import React from 'react';

// Material
import { Grid, Typography } from '@material-ui/core';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './LearningCard.scss';

const LearningCard = ({
  title, subtitle, author, description, preview,
}) => {
  const { theme } = useSelector((state) => state);

  return (
    <Grid className={`LearningCard-${theme}`}>
      {typeof preview === 'string' ? (
        <img
          src={`http://localhost:2424/${preview.replaceAll('\\', '/')}`}
          className="LearningCardPreview"
          alt={title}
        />
      ) : (
        <img
          src={preview}
          className="LearningCardPreview"
          alt={title}
        />
      )}
      <Grid container>
        <Grid item xs={7} className="LearningCardTitles">
          <Typography className="Title">{title}</Typography>
          <Typography className="Subtitle">{subtitle}</Typography>
          <Typography className="By">
            By:
            <span className="Author">{author}</span>
          </Typography>
        </Grid>
        <Grid item xs={5} className="LearningCardDescription">
          <Typography className="Description">{description}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LearningCard;
