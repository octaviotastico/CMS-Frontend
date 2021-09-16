// React and Material UI
import { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import {
  EventTwoTone,
  EventNoteTwoTone,
  FiberManualRecord,
  HistoryRounded
} from '@material-ui/icons';

// Components
import EventCard from "../../Components/EventCard/EventCard";

// API
import { getCurrentEvents, getPastEvents, getUpcomingEvents } from "../../API/calendar";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./Home.scss";
import { navigate } from "../../Router";

const Home = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    getCurrentEvents().then(data => {
      setCurrentEvents(data);
    });
    getUpcomingEvents().then(data => {
      setUpcomingEvents(data);
    });
    getPastEvents().then(data => {
      setPastEvents(data);
    });
  }, []);

  const { theme } = useSelector((state) => state);

  return (
    <Container disableGutters maxWidth={false} className={`Home-${theme}`}>
      <Typography className={`MainTitle-${theme}`}>
        Wellcome again, Octavio
      </Typography>

      <Grid className="Controls">
        <Button>
          Create New Event
          <EventTwoTone />
        </Button>
      </Grid>

      <Grid className="BodyAndFilters">
        <Grid xs={8} className="BodyContainer">
          <Typography className={`Subtitles-${theme}`}>
            Current Events <span className="LiveEvent"><FiberManualRecord />LIVE</span>
          </Typography>
          <Grid className="EventList">
            {currentEvents.map((event, i) => (
              <EventCard
                key={i}
                theme={theme}
                title={event.title}
                description={event.description}
                startDate={new Date(event.startDate)}
                endDate={new Date(event.endDate)}
                tags={event.tags}
              />
            ))}
          </Grid>

          <Typography className={`Subtitles-${theme}`}>
            Upcoming Events <EventNoteTwoTone className="UpcomingEvent" />
          </Typography>
          <Grid className="EventList">
            {upcomingEvents.map((event, i) => (
              <EventCard
                key={i}
                theme={theme}
                title={event.title}
                description={event.description}
                startDate={new Date(event.startDate)}
                endDate={new Date(event.endDate)}
                tags={event.tags}
              />
            ))}
          </Grid>

          <Typography className={`Subtitles-${theme}`}>
            Past Events <HistoryRounded className="PastEvent" />
          </Typography>
          <Grid className="EventList">
            {pastEvents.map((event, i) => (
              <EventCard
                key={i}
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

        <Grid xs={4} className="FiltersContainer">
          <Grid className="CreateContainer">
            <Button onClick={() => navigate("/learning/article/write")}>
              Create New Event
              <EventTwoTone />
            </Button>
          </Grid>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Home;
