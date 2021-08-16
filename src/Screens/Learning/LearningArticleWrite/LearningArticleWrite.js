// React and Material
import { useState } from "react";
import { Button, ButtonGroup, Container, Grid, Typography } from "@material-ui/core";
import MarkdownIt from "markdown-it";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./LearningArticleWrite.scss";
import { Cancel, CloudUpload } from "@material-ui/icons";
import { navigate } from "../../../Router";

const LearningArticleWrite = () => {
  const { theme } = useSelector((state) => state);
  const [article, setArticle] = useState("");
  const md = new MarkdownIt();

  return (
    <Container maxWidth={false} className={`LearningArticleWrite-${theme}`}>
      <Grid className="EditAndPreviewContainer">
        <Grid item xs={6} className="EditColumn">
          <Typography className="Title">Edit</Typography>
          <Grid className="MarkdownInputContainer">
            <textarea
              id="markdown-input"
              className="MarkdownInput"
              onChange={(e) => setArticle(e.target.value)}
            />
          </Grid>
        </Grid>
        <hr className="Divider" />
        <Grid item xs={6} className="PreviewColumn">
          <Typography className="Title">Preview</Typography>
          <Grid className="MarkdownPreviewContainer">
            <div
              dangerouslySetInnerHTML={{ __html: md.render(article) }}
              className="MarkdownPreview"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <ButtonGroup className="ButtonGroup" onClick={() => navigate("/learning")}>
          <Button className="ControlButton"><Cancel /></Button>
          <Button className="ControlButtonTxt">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup className="ButtonGroup">
          <Button className="ControlButton"><CloudUpload /></Button>
          <Button className="ControlButtonTxt">Upload Article</Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

export default LearningArticleWrite;
