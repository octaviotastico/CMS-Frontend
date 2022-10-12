// React
import React, { useState } from "react";

// Redux
// import { useSelector } from "react-redux";

// Material
import { Search, SearchOffTwoTone } from "@mui/icons-material";
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
              Object.keys(options).map((category) => (
                <Grid className="ListCategory" key={`${category}`}>
                  <Typography className="ListTitle">
                    {category[0].toUpperCase() + category.substring(1)}
                  </Typography>

                  {options[category].length > 0 &&
                    options[category].map((elem) => (
                      <Grid className="ListItem" key={`${elem.title}`}>
                        <Grid container className="ImageContainer">
                          <img
                            src={`http://localhost:2424/${elem.preview}`}
                            className="Thumbnails"
                            alt="preview"
                          />
                        </Grid>

                        <Grid container className="TextContainer">
                          <Typography className="Title">{elem.title}</Typography>
                          <Typography className="Subtitle">{elem.subtitle}</Typography>
                        </Grid>
                      </Grid>
                    ))}

                  {options[category].length === 0 && (
                    <Grid className="EmptyListItem">
                      <SearchOffTwoTone className="NoResultIcon" />
                      <Typography className="NoResult">No results</Typography>
                    </Grid>
                  )}
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

export default PSearchBar;
