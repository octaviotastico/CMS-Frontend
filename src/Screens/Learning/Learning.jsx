// React
import React, { useState, useEffect } from 'react';

// Material
import {
  Button, ButtonGroup, Container, Grid, Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Redux
import { useSelector } from 'react-redux';

// Router
import { navigate } from '../../Router';

// API
import { getArticles } from '../../API/learning';

// Mocked data
import { LearningFilter } from '../../Utils/MockData';

// Components
import PFilters from '../../Components/PFilters/PFilters';
import LearningCard from '../../Components/LearningCard/LearningCard';

// Styles
import './Learning.scss';

const Learning = () => {
  const { theme } = useSelector((state) => state);
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilters(LearningFilter);
  }, []);

  const groupByCategory = (articleList) => {
    const grouped = [];

    articleList.forEach((article) => {
      const { category } = article;
      const index = grouped.findIndex((item) => item.category === category);
      if (index === -1) {
        grouped.push({
          category,
          data: [article],
        });
      } else {
        grouped[index].data.push(article);
      }
    });

    return grouped;
  };

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(groupByCategory(res));
    });
  }, []);

  // TODO: Instead of grouping manually, use the
  // endpoint getArticleCategories, and then use
  // the response to call getArticlesByCategories.

  // TODO 2: Add a carousel with all the categories.

  return (
    <Container disableGutters maxWidth={false} className={`Learning-${theme}`}>
      <Typography className="LearningTitle">
        Learn Something New Today!
      </Typography>
      <Typography className="LearningSubtitle">
        Getting better is always a fun thing to do :)
      </Typography>
      <Grid className="BodyAndFilters">
        <Grid item xs={8} className="BodyContainer">
          {articles && articles.map((elem) => (
            <Grid
              container
              spacing={3}
              className="Category"
              key={elem.category}
            >
              <Grid item xs={12} className="CategoryTitleContainer">
                <Typography className="CategoryTitle">
                  {elem.category}
                </Typography>
              </Grid>
              <Grid className="LearningCardList">
                {elem?.data?.map((article) => (
                  <LearningCard
                    title={article.title}
                    subtitle={article.subtitle}
                    content={article.content}
                    preview={article.preview}
                    author={article.author}
                    tags={article.tags}
                    key={article.title}
                  />
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={4} className="FiltersContainer">
          <Grid className={`CreateContainer-${theme}`}>
            <ButtonGroup onClick={() => navigate('/learning/article/write')}>
              <Button className="CreateButton">
                <AddIcon />
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
