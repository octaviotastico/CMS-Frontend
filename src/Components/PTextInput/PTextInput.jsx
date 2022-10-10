// React
import React from "react";

// Material
import { Grid, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PTextInput.scss";

const PTextInput = ({ fieldName, placeholder, isMultiline, icon, value, setValue, onBlur }) => {
  const { theme } = useSelector((state) => state);

  return (
    <Grid className={`PTextInput-${theme}`}>
      <Typography
        className="Title"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textAlign: "left",
          transition: "opacity 0.3s",
        }}
      >
        {icon}
        {fieldName}
      </Typography>
      {isMultiline && (
        <textarea
          value={value}
          placeholder={placeholder}
          className="InputBoxMultiline"
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      )}
      {!isMultiline && (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className="InputBox"
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      )}
    </Grid>
  );
};

export default PTextInput;
