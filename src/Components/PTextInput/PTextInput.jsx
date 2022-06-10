// React
import React from "react";

// Material
import { Grid, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PTextInput.scss";

const PTextInput = ({ fieldName, placeholder, value, setValue }) => {
  const { theme } = useSelector((state) => state);

  return (
    <Grid className={`PTextInput-${theme}`}>
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
        type="text"
        value={value}
        placeholder={placeholder}
        className="InputBox"
        onChange={(e) => setValue(e.target.value)}
      />
    </Grid>
  );
};

export default PTextInput;
