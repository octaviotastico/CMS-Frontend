// React
import React from 'react';

// Material
import { Grid, Tooltip, Typography } from '@material-ui/core';

// Styles
import './PCollapsableButton.scss';

const PCollapsableButton = ({
  text,
  tooltipOpen,
  tooltipClosed,
  action,
  icon,
  open,
  closeTransition,
  openTransition,
  theme,
}) => (
  <Tooltip title={open ? tooltipOpen : tooltipClosed} placement="right" arrow>
    <Grid
      className={`PCollapsableButton-${theme} ${open ? 'Open' : 'Closed'}`}
      style={{ transition: `width ${open ? openTransition : closeTransition}s` }}
      onClick={() => action()}
    >
      <Grid className={`IconContainer ${!open && 'IconClose'}`}>
        {icon && icon()}
      </Grid>
      <Grid className={`TextContainer ${!open && 'TextClose'}`}>
        <Typography className="CollapsableButtonText">
          {text}
        </Typography>
      </Grid>
    </Grid>
  </Tooltip>
);

export default PCollapsableButton;
