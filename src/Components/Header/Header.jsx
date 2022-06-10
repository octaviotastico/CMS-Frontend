// React
import React, { useEffect, useState } from "react";

// Material
import { Button, Container, Grid, Typography } from "@material-ui/core";
import PaletteTwoToneIcon from "@material-ui/icons/PaletteTwoTone";

// Redux
import { useDispatch } from "react-redux";
import { changeTheme } from "../../Redux/ThemeReducer";

// Components
import UserSmallCard from "../UserSmallCard/UserSmallCard";
import PSearchBar from "../PSearchBar/PSearchBar";
import PDropdownButton from "../PDropdownButton/PDropdownButton";

// Mocked Data
import { SearchBarData } from "../../Utils/MockData";

// Router
import { navigate } from "../../Router";

// Styles
import "./Header.scss";

const Header = () => {
  const [textInput, setTextInput] = useState("");
  const [searchList, setSearchList] = useState([]);

  const dispatch = useDispatch();

  const fetchSearchBarData = () => {
    setSearchList(SearchBarData);
  };

  useEffect(() => {
    fetchSearchBarData();
  }, []);

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
    <Container disableGutters maxWidth={false} className="Header">
      <Grid container className="Header">
        <Grid item xs={8} className="HeaderContainer">
          <Button className="DT_CMS" disableRipple onClick={() => navigate("/home")}>
            DT_CMS
          </Button>
          <PSearchBar
            textInput={textInput}
            setTextInput={setTextInput}
            options={searchList}
            placeholder="Search people, documents, articles..."
            className="PSearchBar"
          />
        </Grid>
        <Grid item xs={4} className="HeaderContainer">
          <PDropdownButton
            id="ThemeSelector"
            icon={<PaletteTwoToneIcon />}
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
          <UserSmallCard name="Octaviotastico" profilePic="/images/mock/user.jpg" />
        </Grid>
      </Grid>
    </Container>
  );
};

// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// <div>Icons made by <a href="https://www.flaticon.com/authors/bomsymbols" title="BomSymbols">BomSymbols</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default Header;
