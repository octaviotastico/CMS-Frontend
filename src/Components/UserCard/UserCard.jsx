// React
import React from "react";

// Material
import { Facebook, GitHub, LanguageTwoTone, LinkedIn, Twitter } from "@mui/icons-material";
import { Button, Grid, Link, Typography } from "@mui/material";

// API
import { API_URL } from "../../Utils/constants";

// Styles
import "./UserCard.scss";

const UserCard = ({
  name,
  email,
  profilePicture,
  twitter,
  facebook,
  github,
  linkedin,
  website,
  skills,
  theme,
}) => (
  <Grid className={`UserCard-${theme}`}>
    <img
      className="ProfilePicture"
      src={`${API_URL}/${profilePicture}`}
      alt={`${name} profile pic`}
    />

    <Grid>
      <Typography className="UserName">{name}</Typography>
      <Typography className="Subtitle">{email}</Typography>
    </Grid>

    <Grid>
      {twitter && (
        <Link underline="none" target="_blank" href={`https://www.twitter.com/${twitter}`}>
          <Button className="SocialMediaButton">
            <Twitter />
          </Button>
        </Link>
      )}
      {facebook && (
        <Link underline="none" target="_blank" href={`https://www.facebook.com/${facebook}`}>
          <Button className="SocialMediaButton">
            <Facebook />
          </Button>
        </Link>
      )}
      {github && (
        <Link underline="none" target="_blank" href={`https://www.github.com/${github}`}>
          <Button className="SocialMediaButton">
            <GitHub />
          </Button>
        </Link>
      )}
      {linkedin && (
        <Link underline="none" target="_blank" href={`https://www.linkedin.com/in/${linkedin}`}>
          <Button className="SocialMediaButton">
            <LinkedIn />
          </Button>
        </Link>
      )}
      {website && (
        <Link underline="none" target="_blank" href={website}>
          <Button className="SocialMediaButton">
            <LanguageTwoTone />
          </Button>
        </Link>
      )}
    </Grid>

    <Grid className="SkillChipsContainer">
      {skills.map((skill) => (
        <Typography className="SkillChip" key={skill}>
          {skill}
        </Typography>
      ))}
    </Grid>
  </Grid>
);

export default UserCard;
