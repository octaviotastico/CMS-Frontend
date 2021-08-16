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

// Styles
import "./App.scss";

const routes = {
  "/": () => <Home />,
  "/learning": () => <Learning />,
  "/meetings": () => <Meetings />,
  "/people": () => <People />,
};

const App = () => {
  const match = useRoutes(routes);

  return (
    <Container disableGutters maxWidth={false} className={`App-Theme_03`}>
      <Header />
      <Grid container className="Body">
        <Menu />
        <Grid item className="Content" xs={true}>
          {match || <NotFound />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
