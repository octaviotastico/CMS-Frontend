import { useState } from "react";
import { Button, ClickAwayListener, Grid } from "@material-ui/core";
import "./PDropdownButton.scss";

const PDropdownButton = ({ id, image, dropdown, theme = "Theme_03" }) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className={`PDropdownButton-${theme}`}>
        <Button
          disableRipple
          className="ButtonBase"
          onClick={() => setOpen(!open)}
        >
          <img src={image} alt="Button" className="ButtonImage" />
        </Button>

        {open && (
          <Grid
            id={`Dropdown-${id}`}
            className="DropdownContent"
            onClick={() => setOpen(false)}
          >
            {dropdown}
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default PDropdownButton;
