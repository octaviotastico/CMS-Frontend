// React
import React, { useEffect, useState } from "react";

// Material
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { PaletteTwoTone } from "@mui/icons-material";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../Redux/ThemeReducer";

// Components
import UserSmallCard from "../UserSmallCard/UserSmallCard";
import PSearchBar from "../PSearchBar/PSearchBar";
import PDropdownButton from "../PDropdownButton/PDropdownButton";

// API
import { search } from "../../API/searchbar";

// Router
import { navigate } from "../../Router";

// Styles
import "./Header.scss";

const Header = () => {
  const { theme } = useSelector((state) => state);
  const [textInput, setTextInput] = useState("");
  const [apiResults, setApiResults] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (textInput.length > 0) {
      search(textInput).then((res) => {
        setApiResults(res);
      });
    } else {
      setApiResults({});
    }
  }, [textInput]);

  const themeList = [
    {
      id: "Theme_01",
      title: "Dark Theme",
      select: () => dispatch(changeTheme("Theme_01")),
      gradient: {
        backgroundImage: "linear-gradient(-45deg, #434343, #000000)",
      },
    },
    {
      id: "Theme_02",
      title: "White Theme",
      select: () => dispatch(changeTheme("Theme_02")),
      gradient: {
        backgroundImage: "linear-gradient(-45deg, #c3cfe2, #fdfbfb)",
      },
    },
    {
      id: "Theme_03",
      title: "Violet Theme",
      select: () => dispatch(changeTheme("Theme_03")),
      gradient: {
        backgroundImage: "linear-gradient(-45deg, #8EC5FC, #E0C3FC)",
      },
    },
  ];

  return (
    <Container disableGutters maxWidth={false} className={`Header-${theme}`}>
      <Grid container className="Header">
        <Grid item xs={8} className="TitleContainer">
          <Button className="DT_CMS" disableRipple onClick={() => navigate("/home")}>
            DT_CMS
          </Button>
          <PSearchBar
            textInput={textInput}
            setTextInput={setTextInput}
            options={apiResults}
            placeholder="Search people, documents, articles..."
            className="PSearchBar"
          />
        </Grid>
        <Grid item xs={4} className="MenuContainer">
          <PDropdownButton
            id="ThemeSelector"
            icon={<PaletteTwoTone />}
            dropdown={
              themeList &&
              themeList.map((elem) => (
                <Grid className="ListItem" key={`${elem.title}`} onClick={elem.select}>
                  <Grid item xs={2} className="GradientPreview" style={elem.gradient} />
                  <Grid item xs={10} className="TextContainer">
                    <Typography className="Title">{elem.title}</Typography>
                  </Grid>
                </Grid>
              ))
            }
          />
          <UserSmallCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
