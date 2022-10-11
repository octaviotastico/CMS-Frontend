// React
import React from "react";

// Material
import { Container, Grid } from "@material-ui/core";
import {
  AccountCircleTwoTone,
  ChromeReaderModeTwoTone,
  CommentTwoTone,
  HomeTwoTone,
  // VideoCallTwoTone,
} from "@mui/icons-material";

// Redux
import { useSelector } from "react-redux";

// Components
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";

// React Router
import { useRoutes, getWorkingPath } from "./Router";

// Screens
import Home from "./Screens/Home/Home";
import Learning from "./Screens/Learning/Learning";
import LearningArticleRead from "./Screens/Learning/LearningArticleRead/LearningArticleRead";
import LearningArticleWrite from "./Screens/Learning/LearningArticleWrite/LearningArticleWrite";
import EventCreation from "./Screens/Events/EventCreation";
import Login from "./Screens/LogIn/Login";
import Signup from "./Screens/Signup/Signup";
import Meetings from "./Screens/Meetings/Meetings";
import NotFound from "./Screens/Errors/404/404";
import People from "./Screens/People/People";
import Profile from "./Screens/Profile/Profile";

// Styles
import "./App.scss";

const routes = {
  "/": () => <Login />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/home": () => <Home />,
  "/profile": () => <Profile />,
  "/learning": () => <Learning />,
  "/learning/article/write": () => <LearningArticleWrite />,
  "/learning/article/read": () => <LearningArticleRead />,
  "/calendar/create": () => <EventCreation />,
  "/meetings": () => <Meetings />,
  "/people": () => <People />,
};

const buttonList = [
  {
    text: "Home",
    screen: "/home",
    icon: () => <HomeTwoTone />,
    tooltipOpen: "News, events, and more!",
    tooltipClosed: "Home Screen",
  },

  {
    text: "Learning",
    screen: "/learning",
    icon: () => <ChromeReaderModeTwoTone />,
    tooltipOpen: "Learn something new by reading articles, or teach people writting your own :)",
    tooltipClosed: "Learning Screen",
  },
  {
    text: "Profile",
    screen: "/profile",
    icon: () => <AccountCircleTwoTone />,
    tooltipOpen: "See and update your profile",
    tooltipClosed: "Profile Screen",
  },
  // {
  //   text: "Meetings",
  //   screen: "/meetings",
  //   icon: () => <VideoCallTwoTone />,
  //   tooltipOpen: "Connect with people by making videocalls with them",
  //   tooltipClosed: "Meetings Screen",
  // },
  {
    text: "People",
    screen: "/people",
    icon: () => <CommentTwoTone />,
    tooltipOpen: "Discover new people!",
    tooltipClosed: "People Screen",
  },
];

const App = () => {
  const match = useRoutes(routes);
  const workingPath = getWorkingPath();
  const theme = useSelector((state) => state.theme);

  // We don't want neither header nor menu.
  const outsideAppRoutes = ["/", "/login", "/signup"];

  if (outsideAppRoutes.includes(workingPath)) {
    return match;
  }

  return (
    <Container disableGutters maxWidth={false} className={`App-${theme}`}>
      <Header />
      <Grid container className={`Body-${theme}`}>
        <Menu buttonList={buttonList} />
        <Grid item className="Content" xs>
          {match || <NotFound />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
