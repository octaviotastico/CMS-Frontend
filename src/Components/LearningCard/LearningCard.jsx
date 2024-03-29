// React
import React from "react";

// Material
import { Grid, Typography } from "@mui/material";

// Redux
import { useSelector } from "react-redux";

// API
import { API_URL } from "../../Utils/constants";

// Router
import { navigate } from "../../Router";

// Styles
import "./LearningCard.scss";

const LearningCard = ({ title, subtitle, content, author, tags, preview, id }) => {
  const { theme } = useSelector((state) => state);

  return (
    <Grid
      className={`LearningCard-${theme}`}
      onClick={() => navigate("/learning/article/read", false, { id })}
    >
      {typeof preview === "string" ? (
        <img
          src={`${API_URL}/${preview.replaceAll("\\", "/")}`}
          className="LearningCardPreview"
          alt={title}
        />
      ) : (
        <img src={preview} className="LearningCardPreview" alt={title} />
      )}
      <Grid container className="CardTextContent">
        {/* First section */}
        <Grid item className="LearningCardInfo">
          <Grid>
            <Typography className="Title">{title}</Typography>
            <Typography className="Subtitle">{subtitle}</Typography>
            <Typography className="By">
              By: <span className="Author">{author}</span>
            </Typography>
          </Grid>
          <Grid container className="TagsContainer">
            {tags?.map((tag) => (
              <Grid item className="Tag" key={tag}>
                <Typography className="TagText">{tag}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Divider */}
        <hr className="LearningCardDivider" />

        {/* Second section */}
        <Grid item className="LearningCardDescription">
          <Grid>
            <Typography className="Description">
              {content?.replaceAll("#", "")}
              ...
            </Typography>
            <Typography className="ReadMore">Read more</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LearningCard;
