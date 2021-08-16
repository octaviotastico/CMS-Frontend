import { Checkbox, Grid, Typography } from "@material-ui/core";

import "./PChip.scss";

const PChip = ({ text, selectable, checked, setChecked, theme = "Theme_03" }) => {
  return (
    <Grid className={`PChip-${theme}`}>
      {selectable && (
        <Checkbox
          className="CheckBox"
          checked={checked}
          onClick={() => setChecked(!checked)}
        />
      )}
      <Typography disableRipple className="CheckBoxText">
        {text}
      </Typography>
    </Grid>
  );
};

export default PChip;
