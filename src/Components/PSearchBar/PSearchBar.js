import { useState } from "react";
import { ClickAwayListener, Grid, Typography } from "@material-ui/core";
import "./PSearchBar.scss";

const PSearchBar = ({ textInput, setTextInput, options, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Grid className="PSearchBar">
        <input
          type="text"
          value={textInput}
          placeholder={placeholder}
          onClick={() => setOpen(true)}
          onChange={(e) => setTextInput(e.target.value)}
          className="Input"
        />
        {open && (
          <Grid id="Dropdown" className="DropdownContent">
            {options &&
              options.map((elem) => {
                return (
                  <Grid className="ListCategory" key={`${elem.category}`}>
                    <Typography className="ListTitle">
                      {elem.category}
                    </Typography>
                    {elem.data.map((elem) => {
                      return (
                        <Grid className="ListItem" key={`${elem.title}`}>
                          <img
                            src={elem.image}
                            alt="alt-text"
                            className="Thumbnails"
                          />
                          <Grid container className="TextContainer">
                            <Typography className="Title">
                              {elem.title}
                            </Typography>
                            <Typography className="Subtitle">
                              {elem.subtitle}
                            </Typography>
                            <Typography className="Description">
                              {elem.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              })}
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  );
};

// Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

export default PSearchBar;
