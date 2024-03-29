// React
import React, { useCallback, useEffect, useMemo, useState } from "react";

// Material
import { Button, ButtonGroup, Container, Grid, Typography } from "@material-ui/core";
import { Cancel, CloudUpload } from "@mui/icons-material";

// Redux
import { useSelector } from "react-redux";

// Components
import MarkdownIt from "markdown-it";
import PSelectCreatable from "../../../Components/PSelectCreatable/PSelectCreatable";
import PDropzone from "../../../Components/PDropzone/PDropzone";
import PTextInput from "../../../Components/PTextInput/PTextInput";

// Router
import { getQueryParams, navigate } from "../../../Router";

// API
import {
  editArticle,
  getArticle,
  getArticleCategories,
  getArticleTags,
  postArticle,
} from "../../../API/learning";

// Styles
import "./LearningArticleWrite.scss";

const LearningArticleWrite = () => {
  const md = useMemo(() => new MarkdownIt(), []);
  const { theme } = useSelector((state) => state);
  const { id } = getQueryParams();

  // Article states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [preview, setPreview] = useState(null);

  // Dropdown states
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState([]);

  const handleGetArticle = useCallback(async () => {
    if (!id) return;

    const response = await getArticle(id);

    console.log({ response, id });

    setTitle(response.title);
    setSubtitle(response.subtitle);
    setContent(response.content);
    setPreview(response.preview);

    const responseTags = [];

    tags.forEach((tag) => {
      if (response.tags.includes(tag.value)) {
        responseTags.push(tag);
      }
    });

    setSelectedTags(responseTags);

    categories.forEach((elem) => {
      if (response.category === elem.value) {
        setSelectedCategory(elem);
      }
    });
  }, [id]);

  const handleUploadArticle = useCallback(async () => {
    const article = {
      title,
      subtitle,
      content,
      preview,
      category: selectedCategory.value,
      tags: selectedTags.map((tag) => tag.value),
    };

    if (!id) {
      await postArticle(article);
    } else {
      await editArticle(id, article);
    }

    setTimeout(() => {
      navigate("/learning");
    }, 1000);
  }, [title, subtitle, content, preview, selectedCategory, selectedTags, id]);

  useEffect(() => {
    getArticleTags().then((res) => {
      setTags(res?.map((tag) => ({ label: tag, value: tag })));
    });

    getArticleCategories().then((res) => {
      setCategories(res?.map((category) => ({ label: category, value: category })));
    });

    handleGetArticle();
  }, [id]);

  return (
    <Container maxWidth={false} disableGutters className={`LearningArticleWriteScreen-${theme}`}>
      <Grid className="ArticleInfoContainer">
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid className="TextInputContainer">
            <PTextInput
              fieldName="Article Title"
              placeholder="Delay Tolerant Networks are fun!"
              value={title}
              setValue={setTitle}
            />
          </Grid>
          <Grid className="TextInputContainer">
            <PTextInput
              fieldName="Article Subtitle"
              placeholder="A short description of the article"
              value={subtitle}
              setValue={setSubtitle}
            />
          </Grid>
        </Grid>

        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid className="TextInputContainer">
            <PSelectCreatable
              isClearable
              fieldName="Article Category"
              chosenOptions={selectedCategory}
              setChosenOption={setSelectedCategory}
              options={categories}
            />
          </Grid>
          <Grid className="TextInputContainer">
            <PSelectCreatable
              multiple
              isClearable
              fieldName="Article Tags"
              chosenOptions={selectedTags}
              setChosenOption={setSelectedTags}
              options={tags}
            />
          </Grid>
        </Grid>

        <Grid>
          <Typography className="ArticlePreviewTitle">Article Preview</Typography>
          <PDropzone
            setSelectedFile={setPreview}
            acceptImages
            previouslySelectedImage={id && preview}
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
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Grid>
        </Grid>
        <hr className="Divider" />
        <Grid item xs={6} className="PreviewColumn">
          <Typography className="Title">Preview</Typography>
          <Grid className="MarkdownPreviewContainer">
            <div
              dangerouslySetInnerHTML={{ __html: md.render(content) }}
              className="MarkdownPreview"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid className="ActionButtons">
        <ButtonGroup className="ButtonGroup" onClick={() => navigate("/learning")}>
          <Button className="ControlButton">
            <Cancel />
          </Button>
          <Button className="ControlButtonTxt">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup className="ButtonGroup">
          <Button className="ControlButton">
            <CloudUpload />
          </Button>
          <Button className="ControlButtonTxt" onClick={() => handleUploadArticle()}>
            {id ? "Update" : "Upload"} Article
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

export default LearningArticleWrite;
