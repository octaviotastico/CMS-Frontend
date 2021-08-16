// Material
import { Container, Grid } from "@material-ui/core";

// Components
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";

// React Router
import { useRoutes } from "./Router";

// All Screens
import Home from "./Screens/Home/Home";
import Learning from "./Screens/Learning/Learning";
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
  "/meetings": () => <Meetings />,
  "/people": () => <People />,
};

const buttonList = [
  {
    text: "Home",
    screen: "/",
  },
  {
    text: "Learning",
    screen: "/learning",
  },
  {
    text: "Meetings",
    screen: "/meetings",
  },
  {
    text: "People",
    screen: "/people",
  },
];

const App = () => {
  const match = useRoutes(routes);
  const theme = useSelector((state) => state.theme);

  return (
    <Container disableGutters maxWidth={false} className={`App-${theme}`}>
      <Header />
      <Grid container className="Body">
        <Menu buttonList={buttonList} />
        <Grid item className="Content" xs={true}>
          {match || <NotFound />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
