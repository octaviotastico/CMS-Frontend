// React
import React, { useState, useEffect } from "react";

// Material
import Container from "@mui/material/Container";

// Redux
import { useSelector } from "react-redux";

// Components
import UserCard from "../../Components/UserCard/UserCard";

// API
import { getAllUsers } from "../../API/user";

// Styles
import "./People.scss";

const People = () => {
  const { theme } = useSelector((state) => state);
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const response = await getAllUsers();
    setPeople(response);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <Container disableGutters maxWidth={false} className={`People-${theme}`}>
      {/* <Typography className="Title">They&apos;re awesome people just like you.</Typography> */}

      {people &&
        people.map((person) => (
          <UserCard
            key={person.username}
            name={`${person.firstName} ${person.lastName}`}
            email={person.email}
            profilePicture={person.profilePicture}
            twitter={person.twitter}
            facebook={person.facebook}
            github={person.github}
            linkedin={person.linkedin}
            website={person.website}
            skills={person.skills}
            theme={theme}
          />
        ))}
    </Container>
  );
};

export default People;
