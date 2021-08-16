// React and Material
import { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Grid, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { navigate } from "../../Router";
import axios from "axios";

// Components
import LearningCard from "../../Components/LearningCard/LearningCard";
import PFilters from "../../Components/PFilters/PFilters";
import { LearningFilter } from "../../Utils/MockData";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./Learning.scss";

const Learning = () => {
  const { theme } = useSelector((state) => state);
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilters(LearningFilter);
  }, []);

  const groupByCategory = (articles) => {
    const grouped = [];

    articles.forEach((article) => {
      const category = article.category;
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
  }

  useEffect(() => {
    const getAllArticles = async () => {
      const res = await axios.get(`http://localhost:2424/learning/articles`);
      setArticles(groupByCategory(res.data, "category"));
    };

    getAllArticles();
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
            {articles && articles.length &&
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
                      {elem.data && elem.data.length && elem.data.map((article) => {
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
            <Grid className="CreateContainer">
              <ButtonGroup onClick={() => navigate("/learning/article/write")}>
                <Button className="CreateButton">
                  <AddIcon/>
                </Button>
                <Button className="CreateButton">Create an article!</Button>
              </ButtonGroup>
            </Grid>
            <PFilters filters={filters} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Learning;
