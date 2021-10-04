// React
import React, { useState, useEffect } from 'react';

// Material
import { Container, Grid, Typography } from '@material-ui/core';

// Mocked data
import { PeopleData, PeopleFilter } from '../../Utils/MockData';

// Components
import UserCard from '../../Components/UserCard/UserCard';
import PFilters from '../../Components/PFilters/PFilters';

// Styles
import './People.scss';

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
          They&apos;re awesome people just like you.
        </Typography>
      </Grid>

      <Grid className="BodyAndFilters">
        <Grid className="BodyContainer">
          {people
            && people.map((elem) => (
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
                  {elem.data.map((person) => (
                    <Grid key={person.name} className="CardContainer">
                      <UserCard
                        name={person.name}
                        position={person.position}
                        profilePic={person.profilePic}
                        skills={person.skills}
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
