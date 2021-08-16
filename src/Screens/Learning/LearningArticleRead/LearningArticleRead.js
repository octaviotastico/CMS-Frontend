// React and Material
import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import axios from "axios";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./LearningArticleRead.scss";

const LearningArticleRead = ({ articleID }) => {
  const { theme } = useSelector((state) => state);
  const [article, setArticle] = useState([]);

  const getArticleByID = async () => {
    const res = await axios.get(`http://localhost:2424/learning/articles/${articleID}`);
    setArticle(res.data);
  };

  useEffect(() => {
    getArticleByID();
  }, []);

  return (
    <Container maxWidth={false} className={`LearningArticleRead-${theme}`}>
      {article}
    </Container>
  );
};

export default LearningArticleRead;
