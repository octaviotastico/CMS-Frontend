// React
import React from "react";

// Material UI
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { AccountBox, Email, Error, Lock, Person } from "@material-ui/icons";

// Router
import { navigate } from "../../Router";

// Styles
import "./Signup.scss";
import { signup } from "../../API/user";

const Signup = () => {
  // Form States
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  // Form Handlers
  const [error, setError] = React.useState("");

  const handleSignup = async () => {
    setError("");
    let response = null;
    try {
      response = await signup(username, password, firstName, lastName, email);
    } catch (err) {
      setError("Invalid credentials, try again");
    }

    console.log("Signup response", response);

    if (response) {
      sessionStorage.setItem("token", response.token);
      navigate("/home");
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <Container disableGutters maxWidth={false} className="Signup">
      <Grid className="RightGridSignup">
        <Typography className="WellcomeTitle">Wellcome to the CMS! :)</Typography>
      </Grid>

      <Grid className="LeftGrid">
        <Grid className="SignupBox">
          <Typography className="SignupTitle">Sign Up</Typography>

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

            <Grid className="InputWrapper">
              <Grid className="IconContainer">
                <Person className="NameIcon" />
              </Grid>
              <input
                className="FirstNameInput"
                placeholder="First Name"
                autoComplete="false"
                onChange={(e) => setFirstName(e.target.value)}
                onKeyPress={keyPressHandler}
                value={firstName}
                type="text"
              />

              <Grid className="IconContainer">
                <Person className="NameIcon" />
              </Grid>
              <input
                className="LastNameInput"
                placeholder="Last Name"
                autoComplete="false"
                onChange={(e) => setLastName(e.target.value)}
                onKeyPress={keyPressHandler}
                value={lastName}
                type="text"
              />
            </Grid>

            <Grid className="InputWrapper">
              <Grid className="IconContainer">
                <Email className="EmailIcon" />
              </Grid>
              <input
                className="Input"
                placeholder="Email"
                autoComplete="false"
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={keyPressHandler}
                value={email}
                type="text"
              />
            </Grid>

            {error && (
              <Grid className="ErrorContainer">
                <Error className="ErrorIcon" />
                <Typography className="Error">{error}</Typography>
              </Grid>
            )}
          </Grid>

          <Button className="SignupButton" onClick={() => handleSignup()}>
            Sign Up
          </Button>
        </Grid>

        <Typography className="HelpText">
          If you already have an account, you can{" "}
          <span
            role="button"
            tabIndex={0}
            className="SignUp"
            onClick={() => navigate("/login")}
            onKeyDown={() => navigate("/login")}
          >
            Log In
          </span>
          .
        </Typography>
      </Grid>
    </Container>
  );
};

export default Signup;
