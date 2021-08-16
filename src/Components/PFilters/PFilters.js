import { Divider, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import PChip from "../PChip/PChip";
import "./PFilters.scss";

const PFilters = ({ filters }) => {
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
    <Grid className="PFilters GlassSurface-01">
      <Typography>Search By Tags!</Typography>
      <Divider variant="middle" className="Divider" />
      {filters.map((filterCategory, i) => {
        return (
          <Grid key={`${filterCategory.category}-${i}`}>
            <Typography className="FilterTitle">{filterCategory.category}</Typography>
            <Grid className="FilterCheckContainer">
              {filterCategory.data.map((elem, j) => {
                return (
                  <PChip
                    key={`${elem.name}-${j}`}
                    text={elem.name}
                    checked={checkArray.indexOf(`${i}-${j}`) !== -1}
                    setChecked={() => handleCheck(i, j)}
                    selectable
                  />
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PFilters;
