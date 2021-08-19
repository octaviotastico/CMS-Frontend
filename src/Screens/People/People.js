import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { PeopleData, PeopleFilter } from "../../Utils/MockData";
import UserCard from "../../Components/UserCard/UserCard";
import PFilters from "../../Components/PFilters/PFilters";
import "./People.scss";

const People = () => {
  const [people, setPeople] = useState([]);
  const [filters, setFilters] = useState([]);

  const fetchFilters = async () => {
    setFilters(PeopleFilter);
  };

  const fetchPeople = async () => {
    setPeople(PeopleData);
  };

  useEffect(() => {
    fetchPeople();
    fetchFilters();
  }, []);

  return (
    <Container disableGutters maxWidth={false} className="People">
      <Grid className="TitleContainer">
        <Typography className="Title">Meet your team!</Typography>
        <Typography className="Title">
          They're awesome people just like you.
        </Typography>
      </Grid>

      <Grid className="BodyAndFilters">
        <Grid className="BodyContainer">
          {people &&
            people.map((elem) => (
              <Grid
                container
                spacing={3}
                className="Category"
                key={`People-${elem.category}`}
              >
                <Grid item xs={12} className="CategoryTitleContainer">
                  <Typography className="CategoryTitle">
                    {elem.category}
                  </Typography>
                </Grid>
                <Grid className="CardHorizontalList">
                  {elem.data.map((elem, i) => (
                    <Grid key={i} className="CardContainer">
                      <UserCard
                        name={elem.name}
                        position={elem.position}
                        profilePic={elem.profilePic}
                        skills={elem.skills}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Grid className="FiltersContainer">
          <PFilters filters={filters} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default People;
