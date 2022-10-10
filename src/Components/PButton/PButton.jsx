// React
import React from "react";

// Styles
import "./PButton.scss";

const PButton = ({ text, action, theme, extraStyle }) => (
  <button className={`PButton-${theme}`} onClick={() => action()} style={extraStyle}>
    {text}
  </button>
);

export default PButton;
