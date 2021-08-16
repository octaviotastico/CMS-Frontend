// Material
import { Checkbox, Grid, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PChip.scss";

const PChip = ({ text, selectable, checked, setChecked }) => {
  const { theme } = useSelector((state) => state);
  return (
    <Grid
      className={`PChip-${theme}`}
      onClick={() => selectable && setChecked(!checked)}
    >
      {selectable && (
        <Checkbox
          className="CheckBox"
          checked={checked}
        />
      )}
      <Typography className="CheckBoxText">
        {text}
      </Typography>
    </Grid>
  );
};

export default PChip;
