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
import PSelect from '../../../Components/PSelect/PSelect';

// Api
import { getArticleCategories, postArticle } from '../../../API/learning';

// Styles
import './LearningArticleWrite.scss';
import { navigate } from '../../../Router';
import PDropzone from '../../../Components/PDropzone/PDropzone';
import PTextInput from '../../../Components/PTextInput/PTextInput';

const LearningArticleWrite = () => {
  const { theme } = useSelector((state) => state);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [article, setArticle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getArticleCategories().then((res) => {
      setTags(res?.map((tag) => ({ label: tag, value: tag })));
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

        <Grid>
          <Typography className="ArticleTagTitle">Article Tags</Typography>
          <PSelect
            multiple
            isClearable
            chosenOptions={selectedTags}
            setChosenOption={setSelectedTags}
            options={tags}
          />
        </Grid>

        <Grid>
          <Typography className="ArticlePreviewTitle">Article Preview</Typography>
          <PDropzone images />
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
                author: 'TODO',
                content: article,
                category: 'TODO',
                description: 'TODO',
                preview: 'TODO',
                tags: selectedTags.map((elem) => elem.value),
              }).then(() => {
                navigate('/learning');
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
