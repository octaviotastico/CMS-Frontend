// React
import React from "react";

// Material
import { Button } from "@material-ui/core";

// Styles
import "./PButton.scss";

const PButton = ({ text, action, extraStyle }) => (
  <Button className="GlassButton-01 PButton" onClick={() => action()} style={extraStyle}>
    {text}
  </Button>
);

export default PButton;
