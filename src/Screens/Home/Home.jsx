// React
import React, { useEffect, useState } from "react";

// Libraries
import jwt from "jwt-decode";

// Material
import { Button, ButtonGroup, Container, Grid, Tooltip, Typography } from "@material-ui/core";
import {
  AddTwoTone,
  EventTwoTone,
  EventNoteTwoTone,
  EventBusyTwoTone,
  FiberManualRecord,
  HistoryRounded,
  Info,
} from "@mui/icons-material";

// Redux
import { useSelector } from "react-redux";

// Router
import { navigate } from "../../Router";

// Components
import EventCard from "../../Components/EventCard/EventCard";

// API
import { getCurrentEvents, getPastEvents, getUpcomingEvents } from "../../API/calendar";

// Styles
import "./Home.scss";

const Home = () => {
  const { theme } = useSelector((state) => state);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    try {
      const tokenData = jwt(sessionStorage.getItem("token"));
      setUserData(tokenData);
    } catch (error) {
      console.log({ error });
      setUserData("");
    }

    getCurrentEvents().then((data) => {
      setCurrentEvents(data);
    });
    getUpcomingEvents().then((data) => {
      setUpcomingEvents(data);
    });
    getPastEvents().then((data) => {
      setPastEvents(data);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false} className={`Home-${theme}`}>
      <Typography className="MainTitle">
        Wellcome again, {userData.firstName} {userData.lastName} :)
      </Typography>

      <Grid className="EventSectionContainer">
        <Typography className="Subtitles">
          Current Events{" "}
          <span className="LiveEvent">
            <FiberManualRecord />
            LIVE
            <Tooltip
              title='Perhaps these events are not being transmitted at the moment, thanks to the delay that exists due to the long distances, but this is the moment in which the signal is reaching us "live".'
              placement="right"
              arrow
            >
              <Info className="LiveEvent-Info" />
            </Tooltip>
          </span>
        </Typography>
        <Grid className="EventList">
          {!currentEvents.length && (
            <Grid className="NoEventsContainer">
              <EventBusyTwoTone className="NoEventIcon" />
              <Typography className="NoEventText">No current events</Typography>
            </Grid>
          )}
          {currentEvents.map((event) => (
            <EventCard
              key={event.title}
              theme={theme}
              title={event.title}
              description={event.description}
              startDate={new Date(event.startDate)}
              endDate={new Date(event.endDate)}
              tags={event.tags}
            />
          ))}
        </Grid>
      </Grid>

      <Grid className="EventSectionContainer">
        <Typography className="Subtitles">
          Upcoming Events <EventNoteTwoTone className="UpcomingEvent" />
        </Typography>
        <Grid className="EventList">
          {!upcomingEvents.length && (
            <Grid className="NoEventsContainer">
              <EventBusyTwoTone className="NoEventIcon" />
              <Typography className="NoEventText">No upcoming events</Typography>
            </Grid>
          )}
          {upcomingEvents.map((event) => (
            <EventCard
              author={event.expositor}
              key={event.title}
              theme={theme}
              title={event.title}
              description={event.description}
              startDate={new Date(event.startDate)}
              duration={new Date(event.duration)}
              tags={event.tags}
            />
          ))}
        </Grid>
      </Grid>

      <Grid className="EventSectionContainer">
        <Typography className="Subtitles">
          Past Events <HistoryRounded className="PastEvent" />
        </Typography>
        <Grid className="EventList">
          {!pastEvents.length && (
            <Grid className="NoEventsContainer">
              <EventBusyTwoTone className="NoEventIcon" />
              <Typography className="NoEventText">No past events</Typography>
            </Grid>
          )}
          {pastEvents.map((event) => (
            <EventCard
              key={event.title}
              theme={theme}
              title={event.title}
              description={event.description}
              startDate={new Date(event.startDate)}
              endDate={new Date(event.endDate)}
              tags={event.tags}
            />
          ))}
        </Grid>
      </Grid>

      <Typography className="Subtitles">
        Create a new event! <AddTwoTone className="NewEvent" />
      </Typography>
      <ButtonGroup onClick={() => navigate("/calendar/create")}>
        <Button className="CreateButton">
          <EventTwoTone />
        </Button>
        <Button className="CreateButton">Create A New Event</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Home;
