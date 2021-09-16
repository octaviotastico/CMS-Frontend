// React and Material
import { useState } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';

// Components and Functions
import PCollapsableButton from "../PCollapsableButton/PCollapsableButton";
import { useSelector } from "react-redux";
import { navigate } from "../../Router";

// Styles
import "./Menu.scss";

const Menu = ({ buttonList }) => {
  const theme = useSelector((state) => state.theme);
  const [open, setOpen] = useState(true);

  return (
    <Grid
      item
      className={`Menu-${theme}`}
      style={open
        ? { maxWidth: "340px", minWidth: "190px", width: "20vw" }
        : { width: 70 }
      }
    >
      <Grid className="MenuButtons">
        {buttonList.map((button, index) => (
          <PCollapsableButton
            key={index}
            open={open}
            closeTransition={1}
            openTransition={0.5}
            text={button.text}
            tooltipOpen={button.tooltipOpen}
            tooltipClosed={button.tooltipClosed}
            icon={button.icon}
            action={() => navigate(button.screen)}
            theme={theme}
          />
        ))}
      </Grid>
      <Grid className="MenuFooter">
        <Tooltip title="Report a bug!" placement="right" arrow>
          <button className={`BugButton-${theme}`}>
            <BugReportTwoToneIcon className="BugIcon" />
          </button>
        </Tooltip>

        <Tooltip title={`${open ? "Close" : "Open"} the menu`} placement="right" arrow>
          <button className={`ArrowButton-${theme}`} onClick={() => setOpen(!open)}>
            <ArrowBackIosTwoToneIcon className={`Arrow ${!open && "Rotate"}`} />
          </button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Menu;
