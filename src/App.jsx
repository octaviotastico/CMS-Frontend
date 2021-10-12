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
import { useRoutes } from './Router';

// Screens
import Home from './Screens/Home/Home';
import Learning from './Screens/Learning/Learning';
import LearningArticleWrite from './Screens/Learning/LearningArticleWrite/LearningArticleWrite';
import Meetings from './Screens/Meetings/Meetings';
import People from './Screens/People/People';
import NotFound from './Screens/Errors/404/404';

// Styles
import './App.scss';

const routes = {
  '/': () => <Home />,
  '/learning': () => <Learning />,
  '/learning/article/write': () => <LearningArticleWrite />,
  '/meetings': () => <Meetings />,
  '/people': () => <People />,
};

const buttonList = [
  {
    text: 'Home',
    screen: '/',
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
  const theme = useSelector((state) => state.theme);

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
