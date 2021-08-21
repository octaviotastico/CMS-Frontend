// React and Material UI
import { Container, Grid } from "@material-ui/core";

// Components
import PDropzone from "../../Components/PDropzone/PDropzone";

// Styles
import "./Meetings.scss";

const Meetings = () => {
  return (
    <Container disableGutters maxWidth={false} className="Meetings">
      Screen Content Meetings
      <Grid style={{width: 500}} >
        <PDropzone validTypes={["image/jpg", "image/jpeg", "image/png"]} />
      </Grid>
    </Container>
  );
};

export default Meetings;
