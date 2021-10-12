// React
import React, { useState } from 'react';

// Material
import { Divider, Grid, Typography } from '@material-ui/core';

// Redux
import { useSelector } from 'react-redux';

// Components
import PChip from '../PChip/PChip';

// Styles
import './PFilters.scss';

const PFilters = ({ filters }) => {
  const { theme } = useSelector((state) => state);
  const [checkArray, setCheckArray] = useState([]);

  const handleCheck = (i, j) => {
    const newElem = `${i}-${j}`;
    const index = checkArray.indexOf(newElem);
    if (index === -1) {
      setCheckArray([...checkArray, newElem]);
    } else {
      setCheckArray(checkArray.filter((elem) => elem !== newElem));
    }
  };

  return (
    <Grid className={`PFilters-${theme}`}>
      <Typography className="TableTitle">Search By Tags!</Typography>
      <Divider variant="middle" className="Divider" />
      {filters.map((filterCategory, i) => (
        <Grid key={filterCategory.category}>
          <Typography className="FiltersTitle">{filterCategory.category}</Typography>
          <Grid className="FilterCheckContainer">
            {filterCategory.data.map((elem, j) => (
              <PChip
                key={elem.name}
                text={elem.name}
                checked={checkArray.indexOf(`${i}-${j}`) !== -1}
                setChecked={() => handleCheck(i, j)}
                selectable
              />
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default PFilters;
