import React, { useState } from "react";

// Material
import { Button, ClickAwayListener, Grid } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PDropdownButton.scss";

const PDropdownButton = ({ id, icon, dropdown }) => {
  const { theme } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const IconComponent = React.cloneElement(icon, { className: `DropdownIcon-${theme}` });

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className={`PDropdownButton-${theme}`}>
        <Button
          disableRipple
          className="ButtonBase"
          onClick={() => setOpen(!open)}
        >
          {IconComponent}
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
