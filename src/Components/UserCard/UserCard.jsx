// React
import React from 'react';

// Material
import { Grid, Typography } from '@material-ui/core';

// Components
import PTilt from '../PTilt/PTilt';

// Styles
import './UserCard.scss';

const UserCard = ({
  name, position, profilePic, skills,
}) => (
  <PTilt options={{
    speed: 250, perspective: 500, reverse: true, max: 5,
  }}
  >
    <Grid className="UserCard GlassSurface-01">
      <Grid item className="Picture">
        <img
          className="ProfilePic"
          src={profilePic}
          alt={`${name} profile pic`}
        />
      </Grid>
      <Grid item className="Text">
        <Typography className="UserName">{name}</Typography>
        <Typography className="Subtitle">{position}</Typography>
        <Grid className="SkillChipsContainer">
          {skills.map((skill) => (
            <Typography className="SkillChip GlassSurface-01">
              {skill}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </PTilt>
);

export default UserCard;
