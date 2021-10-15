// React
import React from 'react';

// Material
import { Container, Grid, Typography } from '@material-ui/core';

// Styles
import './Login.scss';

const Login = () => (
  <Container disableGutters maxWidth={false} className="Login">
    <Grid className="LeftGrid">
      <Grid className="LoginBox">
        <Typography className="LoginTitle">
          Login
        </Typography>
      </Grid>
      <Typography>
        If you don&apos;t have an account, you can SignUp.
      </Typography>
    </Grid>
    <Grid className="RightGrid">
      <Typography className="WellcomeTitle">
        Wellcome to EpicCMS! :)
      </Typography>
    </Grid>
  </Container>
);

export default Login;
