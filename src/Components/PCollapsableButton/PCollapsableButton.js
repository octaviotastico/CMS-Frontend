import { Grid, Typography } from "@material-ui/core";
import "./PCollapsableButton.scss";

const PCollapsableButton = ({ text, action, icon, open, transition }) => {
  return (
    <Grid
      className="PCollapsableButton"
      onClick={() => action()}
      style={
        open
          ? {
              width: "100%",
              borderRadius: 3,
              transition: `width ${transition}s`,
            }
          : {
              width: 50,
              borderRadius: 100,
              transition: "all 0.5s",
            }
      }
    >
      {icon ? (
        <img src={icon.src} alt={icon.alt} />
      ) : (
        !open && <Typography>{text[0]}</Typography>
      )}
      {open ? <Typography>{text}</Typography> : null}
    </Grid>
  );
};

export default PCollapsableButton;
