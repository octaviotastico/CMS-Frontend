// React and Material
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Grid, Typography } from "@material-ui/core";
import PSelect from "../../../Components/PSelect/PSelect";
import MarkdownIt from "markdown-it";

// Redux
import { useSelector } from "react-redux";

// Api
import { getArticleCategories, postArticle } from "../../../API/learning";

// Styles
import "./LearningArticleWrite.scss";
import { Cancel, CloudUpload } from "@material-ui/icons";
import { navigate } from "../../../Router";

const LearningArticleWrite = () => {
  const { theme } = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [article, setArticle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getArticleCategories().then((res) => {
      setTags(res?.map((tag) => ({ label: tag, value: tag })));
    });
  }, []);

  const md = new MarkdownIt();

  return (
    <Container maxWidth={false} style={{paddingTop: 13}} className={`LearningArticleWriteScreen-${theme}`}>
      <Grid className="ArticleInfoContainer">
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "49.5%"
          }}>
            <Typography
              style={{
                textAlign: "left",
                opacity: title ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              Title
            </Typography>
            <input
              type="text"
              value={title}
              placeholder="Title"
              className="InputTitle"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "49.5%"
          }}>
            <Typography
              style={{
                textAlign: "left",
                opacity: subtitle ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              Subtitle
            </Typography>
            <input
              type="text"
              value={subtitle}
              placeholder="Subtitle"
              className="InputSubtitle"
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid>
          <Typography style={{textAlign: "left"}}>Article Tags</Typography>
          <PSelect
            multiple
            isClearable
            chosenOptions={selectedTags}
            setChosenOption={setSelectedTags}
            options={tags}
          />
        </Grid>
      </Grid>

      <Grid maxWidth={false} className="EditPreviewContainer">
        <Grid item xs={6} className="EditColumn">
          <Typography className="Title">Edit</Typography>
          <Grid className="MarkdownInputContainer">
            <textarea
              id="markdown-input"
              className="MarkdownInput"
              onChange={(e) => setArticle(e.target.value)}
              value={article}
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

      <Grid className="ActionButtons">
        <ButtonGroup className="ButtonGroup" onClick={() => navigate("/learning")}>
          <Button className="ControlButton"><Cancel /></Button>
          <Button className="ControlButtonTxt">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup className="ButtonGroup">
          <Button className="ControlButton"><CloudUpload /></Button>
          <Button
            className="ControlButtonTxt"
            onClick={() => {
              postArticle({
                title,
                subtitle,
                author: "TODO",
                content: article,
                category: "TODO",
                description: "TODO",
                preview: "TODO",
                tags: selectedTags.map(elem => elem.value),
              }).then(() => {
                navigate("/learning");
              });
            }}
          >
            Upload Article
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

export default LearningArticleWrite;
