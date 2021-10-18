// React
import React from 'react';

// Material
import { Container, Grid } from '@material-ui/core';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import ChromeReaderModeTwoToneIcon from '@material-ui/icons/ChromeReaderModeTwoTone';
import VideoCallTwoToneIcon from '@material-ui/icons/VideoCallTwoTone';
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone';

// Redux
import { useSelector } from 'react-redux';

// Components
import Header from './Components/Header/Header';
import Menu from './Components/Menu/Menu';

// React Router
import { useRoutes, getWorkingPath } from './Router';

// Screens
import Home from './Screens/Home/Home';
import Learning from './Screens/Learning/Learning';
import LearningArticleRead from './Screens/Learning/LearningArticleRead/LearningArticleRead';
import LearningArticleWrite from './Screens/Learning/LearningArticleWrite/LearningArticleWrite';
import Login from './Screens/Login/Login';
import Meetings from './Screens/Meetings/Meetings';
import NotFound from './Screens/Errors/404/404';
import People from './Screens/People/People';
import Signup from './Screens/Signup/Signup';

// Styles
import './App.scss';

const routes = {
  '/': () => <Login />,
  '/signup': () => <Signup />,
  '/home': () => <Home />,
  '/learning': () => <Learning />,
  '/learning/article/write': () => <LearningArticleWrite />,
  '/learning/article/read': () => <LearningArticleRead />,
  '/meetings': () => <Meetings />,
  '/people': () => <People />,
};

const buttonList = [
  {
    text: 'Home',
    screen: '/home',
    icon: () => <HomeTwoToneIcon />,
    tooltipOpen: 'News, events, and more!',
    tooltipClosed: 'Home Screen',
  },
  {
    text: 'Learning',
    screen: '/learning',
    icon: () => <ChromeReaderModeTwoToneIcon />,
    tooltipOpen: 'Learn something new by reading articles, or teach people writting your own :)',
    tooltipClosed: 'Learning Screen',
  },
  {
    text: 'Meetings',
    screen: '/meetings',
    icon: () => <VideoCallTwoToneIcon />,
    tooltipOpen: 'Connect with people by making videocalls with them',
    tooltipClosed: 'Meetings Screen',
  },
  {
    text: 'People',
    screen: '/people',
    icon: () => <CommentTwoToneIcon />,
    tooltipOpen: 'Discover new people!',
    tooltipClosed: 'People Screen',
  },
];

const App = () => {
  const match = useRoutes(routes);
  const workingPath = getWorkingPath();
  const theme = useSelector((state) => state.theme);

  // If because we don't want neither header nor menu
  if (workingPath === '/') {
    return match;
  }

  if (workingPath === '/signup') {
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
