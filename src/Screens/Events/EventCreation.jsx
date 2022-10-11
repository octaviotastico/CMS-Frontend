// React
import React, { useState } from "react";

// Material
import { Button, ButtonGroup, Container, Grid, Typography } from "@material-ui/core";
import { Cancel, CloudUpload } from "@mui/icons-material";

// Redux
import { useSelector } from "react-redux";

// Components
import PSelectCreatable from "../../Components/PSelectCreatable/PSelectCreatable";
import PDropzone from "../../Components/PDropzone/PDropzone";
import PTextInput from "../../Components/PTextInput/PTextInput";
import PDateTimePicker from "../../Components/PDateTimePicker/PDateTimePicker";
import PTimeInput from "../../Components/PTimeInput/PTimeInput";

// Router
import { navigate } from "../../Router";

// Api
import { postEvent } from "../../API/calendar";

// Styles
import "./EventCreation.scss";

const EventCreation = () => {
  const { theme } = useSelector((state) => state);

  // Event states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [preview, setPreview] = useState(null);

  // Dropdown states
  // const [tags, setTags] = useState([]);

  return (
    <Container maxWidth={false} className={`EventCreationScreen-${theme}`}>
      <Grid className="EventInfoContainer">
        <PTextInput
          fieldName="Event Title"
          placeholder="Distributed Database Implementation for Delay Tolerant Networks"
          value={title}
          setValue={setTitle}
        />
        <PTextInput
          fieldName="Event Description"
          placeholder="Mongoose wrapper for making your application delay tolerant"
          value={description}
          setValue={setDescription}
        />
        <PSelectCreatable
          multiple
          isClearable
          fieldName="Event Tags"
          chosenOptions={selectedTags}
          setChosenOption={setSelectedTags}
          options={[]}
        />

        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid className="TextInputContainer">
            <PDateTimePicker fieldName="Start Date" value={startDate} setValue={setStartDate} />
          </Grid>

          <Grid className="TextInputContainer">
            <PTimeInput fieldName="Duration of the event" value={duration} setValue={setDuration} />
          </Grid>
        </Grid>

        <Grid>
          <Typography className={`EventPreviewTitle-${theme}`}>Event Preview</Typography>
          <PDropzone setSelectedFile={setPreview} acceptImages />
        </Grid>
      </Grid>

      <Grid className="ActionButtons">
        <ButtonGroup className="ButtonGroup" onClick={() => navigate("/learning")}>
          <Button className="ControlButton">
            <Cancel />
          </Button>
          <Button className="ControlButtonTxt">Cancel</Button>
        </ButtonGroup>
        <ButtonGroup className="ButtonGroup">
          <Button className="ControlButton">
            <CloudUpload />
          </Button>
          <Button
            className="ControlButtonTxt"
            onClick={() => {
              postEvent({
                title,
                description,
                startDate,
                duration,
                preview,
                tags: selectedTags.map((elem) => elem.value),
              }).then(() => {
                setTimeout(() => {
                  navigate("/learning");
                }, 1000);
              });
            }}
          >
            Upload Event
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

export default EventCreation;
