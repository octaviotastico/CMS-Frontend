// React
import React from "react";

// Material
// import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Grid, TextField, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// Styles
import "./PDateTimePicker.scss";

const PDateTimePicker = ({ fieldName, value, setValue, minDate = new Date() }) => {
  const { theme } = useSelector((state) => state);

  return (
    <Grid className={`PDateTimePicker-${theme}`}>
      <Typography
        className="Title"
        style={{
          textAlign: "left",
          transition: "opacity 0.3s",
        }}
      >
        {fieldName}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={value}
          onChange={setValue}
          minDate={minDate}
          renderInput={(params) => <TextField {...params} />}
          InputProps={{
            disableUnderline: true,
            className: "InputBox",
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
};

export default PDateTimePicker;
