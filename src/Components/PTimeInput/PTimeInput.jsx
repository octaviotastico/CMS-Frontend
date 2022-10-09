// React
import React from "react";

// Material
import { Grid, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PTimeInput.scss";

const PTimeInput = ({ fieldName, value, setValue }) => {
  const { theme } = useSelector((state) => state);

  return (
    <Grid className={`PTimeInput-${theme}`}>
      <Typography
        className="Title"
        style={{
          textAlign: "left",
          transition: "opacity 0.3s",
        }}
      >
        {fieldName}
      </Typography>
      <input
        type="time"
        value={value}
        className="InputBox"
        onChange={(e) => setValue(e.target.value)}
      />
    </Grid>
  );
};

export default PTimeInput;
