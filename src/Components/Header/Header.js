// React
import { useEffect, useState } from "react";

// Material
import { Container, Grid, Typography } from "@material-ui/core";

// Components
import UserSmallCard from "../UserSmallCard/UserSmallCard";
import PSearchBar from "../PSearchBar/PSearchBar";
import PDropdownButton from "../PDropdownButton";

// Styles
import "./Header.scss";

const Header = () => {
  const [textInput, setTextInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    setSearchList([]);
  }, []);

  const themeList = [
    {
      id: "Theme_01",
      title: "Dark Theme",
      select: () => console.log("Theme_01"),
      gradient: {
        backgroundImage: "linear-gradient(-45deg, #434343, #000000)",
      },
    },
    {
      id: "Theme_02",
      title: "White Theme",
      select: () => console.log("Theme_02"),
      gradient: {
        backgroundImage: "linear-gradient(-45deg, #c3cfe2, #fdfbfb)",
      },
    },
    {
      id: "Theme_03",
      title: "Violet Theme",
      select: () => console.log("Theme_03"),
      gradient: {
        backgroundImage: "linear-gradient(-45deg, #8EC5FC, #E0C3FC)",
      },
    },
  ];

  return (
    <Container disableGutters maxWidth={false} className="Header">
      <Grid container className="Header">
        <Grid item xs={8} className="HeaderContainer">
          <Typography variant="h1" className="EpicCMS">
            EpicCMS!
          </Typography>
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
            image="/icons/palette.svg"
            dropdown={
              themeList &&
              themeList.map((elem) => {
                return (
                  <Grid
                    className="ListItem"
                    key={`${elem.title}`}
                    onClick={elem.select}
                  >
                    <Grid
                      xs={2}
                      className="GradientPreview"
                      style={elem.gradient}
                    />
                    <Grid xs={10} container className="TextContainer">
                      <Typography className="Title">{elem.title}</Typography>
                    </Grid>
                  </Grid>
                );
              })
            }
          />
          <UserSmallCard
            name="Octaviotastico"
            profilePic="/images/mock/user.jpg"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default Header;
