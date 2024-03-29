// React
import React, { useState, useEffect } from "react";

// Material
import { Button, ButtonGroup, Container, Grid, Typography } from "@mui/material";
import { Add, SearchOff } from "@mui/icons-material";

// Redux
import { useSelector } from "react-redux";

// Router
import { navigate } from "../../Router";

// API
import { getArticleCategories, getArticlesByCategories } from "../../API/learning";

// Mocked data
import { LearningFilter } from "../../Utils/MockData";

// Components
import PFilters from "../../Components/PFilters/PFilters";
import LearningCard from "../../Components/LearningCard/LearningCard";

// Styles
import "./Learning.scss";

const Learning = () => {
  const { theme } = useSelector((state) => state);
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // TODO: Get filters from API
    setFilters(LearningFilter);
  }, []);

  const handleGetArticles = async () => {
    const categories = await getArticleCategories();
    const articleListGrouped = await Promise.all(
      categories.map(async (category) => {
        const data = await getArticlesByCategories(category);
        return {
          category,
          data,
        };
      }),
    );
    setArticles(articleListGrouped || []);
  };

  useEffect(() => {
    handleGetArticles();
  }, []);

  // TODO: Add a carousel with all the categories.
  return (
    <Container maxWidth={false} className={`Learning-${theme}`}>
      <Typography className="LearningTitle">Learn Something New Today!</Typography>
      <Typography className="LearningSubtitle">
        Getting better is always a fun thing to do :)
      </Typography>

      <Grid className="BodyAndFilters">
        <Grid item xs={8} className="BodyContainer">
          {/* All articles */}
          {articles.map((elem) => (
            <Grid container spacing={3} className="Category" key={elem.category}>
              <Grid item xs={12} className="CategoryTitleContainer">
                <Typography className="CategoryTitle">{elem.category}</Typography>
              </Grid>
              <Grid className="LearningCardList">
                {elem.data.map((article) => (
                  <LearningCard
                    key={article.id}
                    title={article.title}
                    subtitle={article.subtitle}
                    content={article.content}
                    preview={article.preview}
                    author={article.author}
                    tags={article.tags}
                    id={article.id}
                  />
                ))}
              </Grid>
            </Grid>
          ))}

          {/* No articles yet */}
          {!articles.length && (
            <Grid className="NoArticlesContainer">
              <SearchOff className="NoArticlesIcon" />
              <Typography className="NoArticles">
                There are no articles yet.
                <br />
                Please try again later, or write the first one yourself!
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid item xs={4} className="FiltersContainer">
          <Grid className="CreateContainer">
            <ButtonGroup onClick={() => navigate("/learning/article/write")}>
              <Button className="CreateButton">
                <Add />
              </Button>
              <Button className="CreateButton">Create an article!</Button>
            </ButtonGroup>
          </Grid>
          <PFilters filters={filters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Learning;
