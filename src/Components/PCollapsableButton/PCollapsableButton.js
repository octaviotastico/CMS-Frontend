import { Grid, Typography } from "@material-ui/core";
import "./PCollapsableButton.scss";

const PCollapsableButton = ({ text, action, icon, open, closeTransition, openTransition, theme }) => {
  return (
    <Grid
      className={`PCollapsableButton-${theme} ${open ? "Open" : "Closed"}`}
      style={{ transition: `width ${open ? openTransition : closeTransition}s` }}
      onClick={() => action()}
    >
      <Grid className={`IconContainer ${!open && "IconClose"}`}>
        {icon && icon()}
      </Grid>
      <Grid className={`TextContainer ${!open && "TextClose"}`}>
        <Typography className="CollapsableButtonText">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PCollapsableButton;
