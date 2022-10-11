// React
import React from "react";

// Material UI
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { AccountBox, Error, Lock } from "@mui/icons-material";

// Router
import { navigate } from "../../Router";

// Styles
import "./Login.scss";
import { login } from "../../API/user";

const Login = () => {
  // Form States
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Form Handlers
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    setError("");
    let response = null;
    try {
      response = await login(username, password);
    } catch (err) {
      setError("Invalid credentials, try again");
    }

    console.log("Login response", response);

    if (response) {
      sessionStorage.setItem("token", response.token);
      navigate("/home");
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container disableGutters maxWidth={false} className="Login">
      <Grid className="LeftGrid">
        <Grid className="LoginBox">
          <Typography className="LoginTitle">Login</Typography>

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
                onKeyPress={keyPressHandler}
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
                onKeyPress={keyPressHandler}
                value={password}
                type="password"
              />
            </Grid>
            {error && (
              <Grid className="ErrorContainer">
                <Error className="ErrorIcon" />
                <Typography className="Error">{error}</Typography>
              </Grid>
            )}
          </Grid>

          <Button className="LoginButton" onClick={() => handleLogin()}>
            Login
          </Button>
        </Grid>

        <Typography className="HelpText">
          If you don&apos;t have an account, you can{" "}
          <span
            role="button"
            tabIndex={0}
            className="SignUp"
            onClick={() => navigate("/signup")}
            onKeyDown={() => navigate("/signup")}
          >
            SignUp
          </span>
          .
        </Typography>
      </Grid>

      <Grid className="RightGridLogin">
        <Typography className="WellcomeTitle">Wellcome back! :)</Typography>
      </Grid>
    </Container>
  );
};

export default Login;
