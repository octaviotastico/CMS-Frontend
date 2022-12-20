// React
import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Material
import { Search, SearchOffTwoTone } from "@mui/icons-material";
import { ClickAwayListener, Grid, Typography } from "@material-ui/core";

// API
import { API_URL } from "../../Utils/constants";

// Styles
import "./PSearchBar.scss";

const PSearchBar = ({ textInput, setTextInput, options, placeholder }) => {
  const { theme } = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className={`PSearchBar-${theme}`}>
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
            className="PSearchBarInput"
          />
        </Grid>
        {open && textInput.length > 0 && (
          <Grid id="Dropdown" className="PSearchBarDropdownContent">
            {options &&
              Object.keys(options).map((category) => (
                <Grid className="PSearchBarListCategory" key={`${category}`}>
                  <Typography className="PSearchBarListTitle">
                    {category[0].toUpperCase() + category.substring(1)}
                  </Typography>

                  {options[category].length > 0 &&
                    options[category].map((elem) => (
                      <Grid className="MenuItemList" key={`${elem.title}`}>
                        <Grid container className="ImageContainer">
                          <img
                            src={`${API_URL}/${elem.preview}`}
                            className="Thumbnails"
                            alt="preview"
                          />
                        </Grid>

                        <Grid container className="TextContainer">
                          <Typography className="PSearchBarTitle">{elem.title}</Typography>
                          <Typography className="PSearchBarSubtitle">{elem.subtitle}</Typography>
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
