import { Container, Typography } from "@material-ui/core";
import "./Home.scss";

const Home = () => {
  const user = "Octa"
  return (
    <Container disableGutters maxWidth={false} className="Home">
      <Typography className="MainTitle">Wellcome again, {user}</Typography>
    </Container>
  );
};

export default Home;
