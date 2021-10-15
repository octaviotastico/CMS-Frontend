// React
import React, { useEffect, useState } from 'react';

// Material
import { Container, Grid, Typography } from '@material-ui/core';

// Components
import MarkdownIt from 'markdown-it';

// Redux
import { useSelector } from 'react-redux';

// API
import { getArticle } from '../../../API/learning';

// Router
import { getQueryParams } from '../../../Router';

// Styles
import './LearningArticleRead.scss';

const LearningArticleRead = () => {
  const { theme } = useSelector((state) => state);
  const { id } = getQueryParams();
  const [article, setArticle] = useState(null);

  const md = new MarkdownIt();

  const handleGetArticle = async (articleID) => {
    const response = await getArticle(articleID);
    setArticle(response);
  };

  useEffect(() => {
    handleGetArticle(id);
  }, []);

  if (article === null) {
    return <div>Loading...</div>;
  }

  // TODO: Show more info about the author

  return (
    <Container maxWidth={false} className={`LearningArticleRead-${theme}`}>

      <Grid className="TitlesAndPreviewContainer">
        <img
          src={`http://localhost:2424/${article.preview.replaceAll('\\', '/')}`}
          className="Preview"
          alt={article.title}
        />
        <Grid className="RightTextContainer">
          <Grid>
            <Typography className="Title">{article.title}</Typography>
            <Typography className="Subtitle">{article.subtitle}</Typography>
          </Grid>

          <Grid>
            <Grid className="CreatedAtContainer">
              <Typography className="CreatedAtTitle">
                Created at:
              </Typography>
              <Typography className="CreatedAt">
                {new Date(article.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
              </Typography>
            </Grid>

            <Grid className="CategoryContainer">
              <Typography className="CategoryTitle">
                Category:
                {' '}
              </Typography>
              <Typography className="Category">
                {article.category}
              </Typography>
            </Grid>

            <Grid className="TagsListContainer">
              <Typography className="TagTitle">
                Tags:
              </Typography>
              {article.tags.map((tag) => (
                <Typography key={tag} className="Tag">
                  {tag}
                </Typography>
              ))}
            </Grid>

            {(article.modifiedAt !== article.createdAt) && (
              <Grid className="ModifiedAtContainer">
                <Typography className="ModifiedAtTitle">
                  Modified at:
                </Typography>
                <Typography className="ModifiedAt">
                  {new Date(article.modifiedAt).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid className="MarkdownPreviewContainer">
        <div
          dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
          className="MarkdownPreview"
        />
      </Grid>

      <Grid>
        <Typography>
          Read more
          {' '}
          {article.category}
          {' '}
          articles
        </Typography>
      </Grid>
    </Container>
  );
};

export default LearningArticleRead;
