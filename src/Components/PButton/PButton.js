import { Button } from "@material-ui/core";
import "./PButton.scss";

const PButton = ({ text, action, extraStyle }) => {
  return (
    <Button
      className="GlassButton-01 PButton"
      onClick={() => action()}
      style={extraStyle}
    >
      {text}
    </Button>
  );
};

export default PButton;
