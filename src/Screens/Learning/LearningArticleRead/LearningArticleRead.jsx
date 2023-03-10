// React
import React, { useCallback, useEffect, useMemo, useState } from "react";

// Material
import { Container, Grid, IconButton, Link, Snackbar, Typography } from "@mui/material";
import { Delete, Edit, Share } from "@mui/icons-material";

// Components
import MarkdownIt from "markdown-it";

// Redux
import { useSelector } from "react-redux";

// API
import { getArticle } from "../../../API/learning";
import { API_URL } from "../../../Utils/constants";

// Router
import { getQueryParams, navigate } from "../../../Router";

// Styles
import "./LearningArticleRead.scss";

const LearningArticleRead = () => {
  const { theme } = useSelector((state) => state);
  const { id } = getQueryParams();
  const [article, setArticle] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const md = useMemo(() => new MarkdownIt(), []);

  const handleGetArticle = useCallback(async (articleID) => {
    const response = await getArticle(articleID);
    setArticle(response);
  }, []);

  useEffect(() => {
    handleGetArticle(id);
  }, [id]);

  const handleShare = useCallback(() => {
    const url = `localhost:3000/learning/article/read?id=${id}`;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  }, [id]);

  // Navigate to the write page with the article data
  // and send props to the component to know that it's
  // in edit mode
  const handleEdit = useCallback(() => {
    navigate("/learning/article/write", {
      state: {
        article,
        edit: true,
      },
    });
  }, []);

  const handleCloseSnackbar = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  }, []);

  // TODO: Show more info about the author

  if (article === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container disableGutters maxWidth={false} className={`LearningArticleRead-${theme}`}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={(...params) => handleCloseSnackbar(...params, setSnackbarOpen)}
        message="Link copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        style={{ fontFamily: "Poppins" }}
      />
      <Grid className="TitlesAndPreviewContainer">
        <img
          src={`${API_URL}/${article.preview?.replaceAll("\\", "/")}`}
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
              <Typography className="CreatedAtTitle">Created at:</Typography>
              <Typography className="CreatedAt">
                {new Date(article.createdAt || null)
                  .toISOString()
                  .replace(/T/, " ")
                  .replace(/\..+/, "")}
              </Typography>
            </Grid>

            <Grid className="CategoryContainer">
              <Typography className="CategoryTitle">Category: </Typography>
              <Typography className="Category">{article.category}</Typography>
            </Grid>

            <Grid className="TagsListContainer">
              <Typography className="TagTitle">Tags:</Typography>
              {article.tags.map((tag) => (
                <Typography key={tag} className="Tag">
                  {tag}
                </Typography>
              ))}
            </Grid>

            {article.modifiedAt !== article.createdAt && (
              <Grid className="ModifiedAtContainer">
                <Typography className="ModifiedAtTitle">Modified at:</Typography>
                <Typography className="ModifiedAt">
                  {new Date(article.updatedAt || null)
                    .toISOString()
                    .replace(/T/, " ")
                    .replace(/\..+/, "")}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid className="ActionsContainer">
        <Grid className="Action" container alignItems="center">
          <IconButton onClick={() => handleShare()}>
            <Share />
          </IconButton>
          <Typography className="ActionText">Share</Typography>
        </Grid>

        <Grid className="Action" container alignItems="center">
          <IconButton onClick={() => handleEdit(article)}>
            <Edit />
          </IconButton>
          <Typography className="ActionText">Edit</Typography>
        </Grid>

        <Grid className="Action" container alignItems="center">
          <IconButton>
            <Delete />
          </IconButton>
          <Typography className="ActionText">Delete</Typography>
        </Grid>
      </Grid>

      <Grid className="MarkdownPreviewContainer">
        <div
          dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
          className="MarkdownPreview"
        />
      </Grid>

      <Grid className="AuthorContainer">
        <Typography className="AuthorTitle">Author:</Typography>
        <Typography className="Author">{article.author}</Typography>
      </Grid>

      <Grid className="ReadModeAboutContainer">
        <Typography>
          Read more <Link href="#">{article.category}</Link> articles
        </Typography>
      </Grid>
    </Container>
  );
};

export default LearningArticleRead;
