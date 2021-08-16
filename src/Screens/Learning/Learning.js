import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import LearningCard from "../../Components/LearningCard/LearningCard";
import { LearningData, LearningFilter } from "../../Utils/MockData";
import PFilters from "../../Components/PFilters/PFilters";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./Learning.scss";

const Learning = () => {
  const { theme } = useSelector((state) => state);
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState([]);

  const fetchFilters = async () => {
    setFilters(LearningFilter);
  };

  const fetchPeople = async () => {
    setArticles(LearningData);
  };

  useEffect(() => {
    fetchPeople();
    fetchFilters();
  }, []);

  return (
    <Container maxWidth={false} className={`Learning-${theme}`}>
      <Grid>
        <Typography className="LearningTitle">
          Learn Something New Today!
        </Typography>
        <Typography className="LearningSubtitle">
          Getting better is always a fun thing to do :)
        </Typography>
        <Grid className="BodyAndFilters">
          <Grid xs={8} className="BodyContainer">
            {articles &&
              articles.map((elem) => {
                return (
                  <Grid
                    container
                    spacing={3}
                    className="Category"
                    key={`Learning-${elem.category}`}
                  >
                    <Grid item xs={12} className="CategoryTitleContainer">
                      <Typography className="CategoryTitle">
                        {elem.category}
                      </Typography>
                    </Grid>
                    <Grid className="LearningCardList">
                      {elem.data.map((article) => {
                        return (
                          <LearningCard
                            title={article.title}
                            subtitle={article.subtitle}
                            description={article.description}
                            author={article.author}
                            preview={article.preview}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid xs={4} className="FiltersContainer">
            <PFilters filters={filters} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Learning;
