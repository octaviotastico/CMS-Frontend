// React
import React, { useEffect, useState } from 'react';

// Material
import {
  Button, Container, Grid, Typography,
} from '@material-ui/core';
import {
  EventTwoTone,
  EventNoteTwoTone,
  FiberManualRecord,
  HistoryRounded,
} from '@material-ui/icons';

// Redux
import { useSelector } from 'react-redux';

// Router
import { navigate } from '../../Router';

// Components
import EventCard from '../../Components/EventCard/EventCard';

// API
import { getCurrentEvents, getPastEvents, getUpcomingEvents } from '../../API/calendar';

// Styles
import './Home.scss';

const Home = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
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

  const { theme } = useSelector((state) => state);

  return (
    <Container disableGutters maxWidth={false} className={`Home-${theme}`}>
      <Typography className={`MainTitle-${theme}`}>
        Wellcome again, Octavio
      </Typography>

      <Grid className="BodyAndFilters">
        <Grid item xs={8} className="BodyContainer">
          <Typography className={`Subtitles-${theme}`}>
            Current Events
            {' '}
            <span className="LiveEvent">
              <FiberManualRecord />
              LIVE
            </span>
          </Typography>
          <Grid className="EventList">
            {!currentEvents.length && (
              <Grid className="NoEventsContainer">
                <img src="/icons/404.svg" alt="404" className={`NoEventIcon-${theme}`} />
                <Typography className={`NoEventText-${theme}`}>
                  No current events
                </Typography>
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

          <Typography className={`Subtitles-${theme}`}>
            Upcoming Events
            {' '}
            <EventNoteTwoTone className="UpcomingEvent" />
          </Typography>
          <Grid className="EventList">
            {!upcomingEvents.length && (
            <Grid className="NoEventsContainer">
              <img src="/icons/404.svg" alt="404" className={`NoEventIcon-${theme}`} />
              <Typography className={`NoEventText-${theme}`}>
                No upcoming events
              </Typography>
            </Grid>
            )}
            {upcomingEvents.map((event) => (
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

          <Typography className={`Subtitles-${theme}`}>
            Past Events
            {' '}
            <HistoryRounded className="PastEvent" />
          </Typography>
          <Grid className="EventList">
            {!pastEvents.length && (
            <Grid className="NoEventsContainer">
              <img src="/icons/404.svg" alt="404" className={`NoEventIcon-${theme}`} />
              <Typography className={`NoEventText-${theme}`}>
                No past events
              </Typography>
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

        <Grid item xs={4} className="FiltersContainer">
          <Grid className="CreateContainer">
            <Button onClick={() => navigate('/learning/article/write')}>
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
