/* eslint-disable react/no-danger */
// React and Material
import React, { useEffect, useState } from 'react';
import {
  Button, ButtonGroup, Container, Grid, Typography,
} from '@material-ui/core';
import { Cancel, CloudUpload } from '@material-ui/icons';

// Redux
import { useSelector } from 'react-redux';

// Components
import MarkdownIt from 'markdown-it';
import PSelectCreatable from '../../../Components/PSelectCreatable/PSelectCreatable';
import PDropzone from '../../../Components/PDropzone/PDropzone';
import PTextInput from '../../../Components/PTextInput/PTextInput';

// Router
import { navigate } from '../../../Router';

// Api
import { getArticleCategories, getArticleTags, postArticle } from '../../../API/learning';

// Styles
import './LearningArticleWrite.scss';

const LearningArticleWrite = () => {
  const { theme } = useSelector((state) => state);

  // Article states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [preview, setPreview] = useState(null);

  // Dropdown states
  const [categories, setCategories] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getArticleTags().then((res) => {
      setTags(res?.map((tag) => ({ label: tag, value: tag })));
    });

    getArticleCategories().then((res) => {
      setCategories(res?.map((category) => ({ label: category, value: category })));
    });
  }, []);

  const md = new MarkdownIt();

  return (
    <Container maxWidth={false} style={{ marginTop: 13 }} className={`LearningArticleWriteScreen-${theme}`}>
      <Grid className="ArticleInfoContainer">

        <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid className="TextInputContainer">
            <PTextInput
              fieldName="Title"
              placeholder="A complete guide to CSS Grid"
              value={title}
              setValue={setTitle}
            />
          </Grid>
          <Grid className="TextInputContainer">
            <PTextInput
              fieldName="Subtitle"
              placeholder="Just kidding bro, use display flex on everything"
              value={subtitle}
              setValue={setSubtitle}
            />
          </Grid>
        </Grid>

        <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid className="TextInputContainer">
            <Typography className="ArticleTagTitle">Article Category</Typography>
            <PSelectCreatable
              isClearable
              chosenOptions={selectedCategory}
              setChosenOption={setSelectedCategory}
              options={categories}
            />
          </Grid>
          <Grid className="TextInputContainer">
            <Typography className="ArticleTagTitle">Article Tags</Typography>
            <PSelectCreatable
              multiple
              isClearable
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
        <ButtonGroup className="ButtonGroup" onClick={() => navigate('/learning')}>
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
                content,
                preview,
                author: 'TODO',
                description: 'TODO',
                category: selectedCategory.value,
                tags: selectedTags.map((elem) => elem.value),
              }).then(() => {
                setTimeout(() => {
                  navigate('/learning');
                }, 1000);
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
