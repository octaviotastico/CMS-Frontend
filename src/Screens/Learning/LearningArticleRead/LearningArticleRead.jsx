// React
import React, { useEffect, useState } from 'react';

// Material
import { Container } from '@material-ui/core';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './LearningArticleRead.scss';

const LearningArticleRead = ({ articleID }) => {
  const { theme } = useSelector((state) => state);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    setArticle({ articleID });
  }, []);

  return (
    <Container maxWidth={false} className={`LearningArticleRead-${theme}`}>
      {article}
    </Container>
  );
};

export default LearningArticleRead;
