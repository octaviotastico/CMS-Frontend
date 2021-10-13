// React
import React from 'react';

// Material
import { Grid, Typography } from '@material-ui/core';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './LearningCard.scss';

const LearningCard = ({
  title, subtitle, content, author, tags, preview,
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
      <Grid container className="CardTextContent">
        <Grid item className="LearningCardInfo">
          <Grid>
            <Typography className="Title">{title}</Typography>
            <Typography className="Subtitle">{subtitle}</Typography>
          </Grid>
          <Typography className="By">
            By:
            {' '}
            <span className="Author">{author}</span>
          </Typography>
        </Grid>

        <hr className={`LearningCardDivider-${theme}`} />

        <Grid item className="LearningCardDescription">

          <Grid>
            <Typography className="Description">
              {content}
              ...
            </Typography>
            <Typography className={`ReadMore-${theme}`}>Read more</Typography>
          </Grid>

          <Grid container className="TagsContainer">
            {tags.map((tag) => (
              <Grid item className={`Tag-${theme}`} key={tag}>
                <Typography className="TagText">
                  {tag}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LearningCard;
