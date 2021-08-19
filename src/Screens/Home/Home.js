// React and Material UI
import { Container, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./Home.scss";

const Home = () => {
  const { theme } = useSelector((state) => state);
  const user = "Octa"
  return (
    <Container disableGutters maxWidth={false} className={`Home-${theme}`}>
      <Typography className={`MainTitle-${theme}`}>Wellcome again, {user}</Typography>
    </Container>
  );
};

export default Home;
