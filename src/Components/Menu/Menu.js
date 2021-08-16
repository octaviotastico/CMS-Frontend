import { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { navigate } from "../../Router";
import PCollapsableButton from "../PCollapsableButton/PCollapsableButton";
import BugReportIcon from "@material-ui/icons/BugReport";
import "./Menu.scss";

const Menu = ({ buttonList }) => {
  const [open, setOpen] = useState(true);

  return (
    <Grid
      item
      className="Menu GlassSurface-02"
      style={open
        ? { maxWidth: "390px", minWidth: "190px", width: "20vw" }
        : { width: 70 }
      }
    >
      <Grid className="MenuButtons">
        {buttonList.map((button, index) => (
          <PCollapsableButton
            key={index}
            open={open}
            transition={1}
            text={button.text}
            action={() => navigate(button.screen)}
          />
        ))}
      </Grid>
      <Grid
        className="MenuFooter"
        style={open ? { flexDirection: "row" } : { flexDirection: "column" }}
      >
        <BugReportIcon style={{ width: 50, height: 50 }} />
        {open && <Typography>Epic CMS!!!</Typography>}
        <Button
          disableRipple
          className={`ArrowButton ${!open && " close"}`}
          style={{ backgroundColor: "transparent" }}
          onClick={() => setOpen(!open)}
        >
          <span className="left-bar" />
          <span className="right-bar" />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Menu;
