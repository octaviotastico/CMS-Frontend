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
import { login } from '../../API/user';

const Login = () => {
  // Form States
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [firstName, setFirstName] = React.useState('');
  // const [lastName, setLastName] = React.useState('');
  // const [email, setEmail] = React.useState('');

  // Form Handlers
  const [showLoginForm, setShowLoginForm] = React.useState(true);
  const [error, setError] = React.useState('');

  const handleLogin = async () => {
    setError('');
    let response = null;
    try {
      response = await login(username, password);
    } catch (err) {
      console.log('err', err);
    }

    console.log('response', response);

    if (response) {
      // localStorage.setItem('token', data.token);
      navigate('/home');
    }
  };

  return (
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
                autoComplete="false"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
                autoComplete="false"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </Grid>
            {error && (
              <Typography className="Error">
                {error}
              </Typography>
            )}
          </Grid>

          <Button
            className="LoginButton"
            onClick={() => handleLogin()}
          >
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
            onClick={() => setShowLoginForm((prev) => !prev)}
            onKeyDown={() => setShowLoginForm((prev) => !prev)}
          >
            SignUp
          </span>
          .
        </Typography>
      </Grid>

      <Grid className={showLoginForm ? 'RightGridLogin' : 'RightGridSignup'}>
        <Typography className="WellcomeTitle">
          Wellcome to EpicCMS! :)
        </Typography>
      </Grid>
    </Container>
  );
};

export default Login;
