// Material
import { Checkbox, Grid, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PChip.scss";

const PChip = ({ text, selectable, checked, setChecked }) => {
  const { theme } = useSelector((state) => state);
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
