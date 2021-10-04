// React
import React from 'react';

// Material
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';

// Styles
import './404.scss';

const NotFound = () => (
  <Container disableGutters maxWidth={false} className="ErrorContainer">
    <Typography className="ErrorCode">404</Typography>
    <Typography className="Subtitle">
      Oohhh shhtt, we probably broke something :(
    </Typography>
    <Grid className="ButtonsContainer">
      <Button className="Buttons">Go Back</Button>
      <Button className="Buttons">HOME</Button>
    </Grid>
  </Container>
);

export default NotFound;
