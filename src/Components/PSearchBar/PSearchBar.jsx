// React
import React, { useState } from "react";

// Redux
// import { useSelector } from "react-redux";

// Material
import { Search } from "@mui/icons-material";
import { ClickAwayListener, Grid, Typography } from "@material-ui/core";

// Styles
import "./PSearchBar.scss";

const PSearchBar = ({ textInput, setTextInput, options, placeholder }) => {
  // const { theme } = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className="PSearchBar">
        <Grid className="SearchbarContainer">
          <button className="SearchButton">
            <Search className="SearchIcon" />
          </button>
          <input
            type="text"
            value={textInput}
            placeholder={placeholder}
            onClick={() => setOpen(true)}
            onChange={(e) => setTextInput(e.target.value)}
            className="Input"
          />
        </Grid>
        {open && (
          <Grid id="Dropdown" className="DropdownContent">
            {options &&
              options.map((elem) => (
                <Grid className="ListCategory" key={`${elem.category}`}>
                  <Typography className="ListTitle">{elem.category}</Typography>
                  {elem.data.map((val) => (
                    <Grid className="ListItem" key={`${val.title}`}>
                      <Grid container className="ImageContainer">
                        <img src={val.image} alt="alt-text" className="Thumbnails" />
                      </Grid>
                      <Grid container className="TextContainer">
                        <Typography className="Title">{val.title}</Typography>
                        <Typography className="Subtitle">{val.subtitle}</Typography>
                        <Typography className="Description">{val.description}</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

// Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

export default PSearchBar;
