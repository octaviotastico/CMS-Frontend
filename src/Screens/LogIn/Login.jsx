// React
import React from 'react';

// Material UI
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import { AccountBox, Lock } from '@material-ui/icons';

// Router
import { navigate } from '../../Router';

// Styles
import './Login.scss';

const Login = () => (
  <Container disableGutters maxWidth={false} className="Login">
    <Grid className="LeftGrid">

      <Grid className="LoginBox">
        <Typography className="LoginTitle">
          Login
        </Typography>

        <Grid className="InputsContainer">

          <Grid className="InputWrapper">
            <Grid className="IconContainer">
              <AccountBox className="UsernameIcon" />
            </Grid>
            <input
              className="Input"
              placeholder="Username"
              autoComplete={false}
              type="text"
            />
          </Grid>

          <Grid className="InputWrapper">
            <Grid className="IconContainer">
              <Lock className="PasswordIcon" />
            </Grid>
            <input
              className="Input"
              placeholder="Password"
              autoComplete={false}
              type="password"
            />
          </Grid>
        </Grid>

        <Button className="LoginButton">
          Login
        </Button>
      </Grid>

      <Typography className="HelpText">
        If you don&apos;t have an account, you can
        {' '}
        <span
          role="button"
          tabIndex={0}
          className="SignUp"
          onClick={() => navigate('/signup')}
          onKeyDown={() => navigate('/signup')}
        >
          SignUp
        </span>
        .
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
