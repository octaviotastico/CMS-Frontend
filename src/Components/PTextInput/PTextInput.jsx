// React
import React from 'react';

// Material
import { Grid, Typography } from '@material-ui/core';

// Styles
import './PTextInput.scss';

const PTextInput = ({
  fieldName, placeholder, value, setValue,
}) => (
  <Grid className="PTextInput">
    <Typography
      className="Title"
      style={{
        textAlign: 'left',
        transition: 'opacity 0.3s',
      }}
    >
      {fieldName}
    </Typography>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      className="InputBox"
      onChange={(e) => setValue(e.target.value)}
    />
  </Grid>
);

export default PTextInput;
