import { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { navigate } from "../../Router";
import PCollapsableButton from "../PCollapsableButton/PCollapsableButton";
import BugReportIcon from "@material-ui/icons/BugReport";
import "./Menu.scss";

const Menu = () => {
  const [open, setOpen] = useState(true);

  const navigateTo = (screen) => {
    navigate(screen);
  };

  return (
    <Grid
      item
      className="Menu GlassSurface-02"
      style={open ? { width: "20vw" } : { width: 70 }}
    >
      <Grid className="MenuButtons">
        <PCollapsableButton
          text="Home"
          open={open}
          transition={1}
          action={() => {
            navigateTo("/");
          }}
        />
        <PCollapsableButton
          text="Learning"
          open={open}
          transition={1}
          action={() => {
            navigateTo("/learning");
          }}
        />
        <PCollapsableButton
          text="Meetings"
          open={open}
          transition={1}
          action={() => {
            navigateTo("/meetings");
          }}
        />
        <PCollapsableButton
          text="People"
          open={open}
          transition={1}
          action={() => {
            navigateTo("/people");
          }}
        />
      </Grid>
      {/* <Divider variant="middle" className="Divider" /> */}
      <Grid
        className="MenuFooter"
        style={open ? { flexDirection: "row" } : { flexDirection: "column" }}
      >
        <BugReportIcon style={{ width: 50, height: 50 }} />
        {open && <Typography>Left menu xDD</Typography>}
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
