// Material
import { Container, Grid } from "@material-ui/core";
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
// import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import ChromeReaderModeTwoToneIcon from '@material-ui/icons/ChromeReaderModeTwoTone';
import VideoCallTwoToneIcon from '@material-ui/icons/VideoCallTwoTone';
// import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import CommentTwoToneIcon from '@material-ui/icons/CommentTwoTone';


// Components
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";

// React Router
import { useRoutes } from "./Router";

// All Screens
import Home from "./Screens/Home/Home";
import Learning from "./Screens/Learning/Learning";
import LearningArticleWrite from "./Screens/Learning/LearningArticleWrite/LearningArticleWrite";
import Meetings from "./Screens/Meetings/Meetings";
import People from "./Screens/People/People";
import NotFound from "./Screens/Errors/404/404";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./App.scss";

const routes = {
  "/": () => <Home />,
  "/learning": () => <Learning />,
  "/learning/article/write": () => <LearningArticleWrite />,
  "/meetings": () => <Meetings />,
  "/people": () => <People />,
};

const buttonList = [
  {
    text: "Home",
    screen: "/",
    icon: () => <HomeTwoToneIcon />,
  },
  {
    text: "Learning",
    screen: "/learning",
    icon: () => <ChromeReaderModeTwoToneIcon />,
  },
  {
    text: "Meetings",
    screen: "/meetings",
    icon: () => <VideoCallTwoToneIcon />,
  },
  {
    text: "People",
    screen: "/people",
    icon: () => <CommentTwoToneIcon />,
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
        <Grid item className="Content" xs={true}>
          {match || <NotFound />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
