// React and Material UI
import React, { useState, useRef } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

// Styles
import "./PDropzone.scss";

const PDropzone = ({ validTypes }) => {
  const [isInside, setIsInside] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileButton = useRef(null);

  const onButtonClick = () => {
    fileButton.current.click();
  };

  const validateFile = (file) => {
    return validTypes.indexOf(file.type) !== -1;
  };

  const inputTagFiles = () => {
    if (fileButton.current.files.length) {
      handleFiles(fileButton.current.files);
    }
  };

  const fileDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
    setIsInside(false);
  };

  const handleFiles = (f) => {
    console.log("f", f);
    console.log("f.length", f.length);
    console.log("validateFile(f[0])", validateFile(f[0]));
    if (f.length === 1 && validateFile(f[0])) {
      setSelectedFile(f[0]);

      var dataURL = "";
      const reader = new FileReader();
      const output = document.getElementById("output");

      reader.onload = function () {
        dataURL = reader.result;
        output.src = dataURL;
      };

      reader.readAsDataURL(f[0]);
      output.src = dataURL;
    } else if (f.length > 1) {
      setError("Cannot select multiple files");
    } else if (!validateFile(f[0])) {
      setError("Invalid file type");
    }
  };

  console.log("selectedFile", selectedFile);

  return (
    <Grid className="PDropzone">
      <Grid
        className={`content ${isInside ? "inside" : "outside"}`}
        onDragEnter={() => setIsInside(true)}
        onDragLeave={() => setIsInside(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={fileDrop}
      >
        <Typography style={{ pointerEvents: "none", userSelect: "none", color: "black" }}>
          Drag and drop your file here
        </Typography>

        <Typography style={{ pointerEvents: "none", userSelect: "none", color: "black" }}>
          or...
        </Typography>

        <input
          type="file"
          ref={fileButton}
          style={{ display: "none" }}
          onChange={inputTagFiles}
        />

        <Button onClick={onButtonClick}>
          Select an image from your device
        </Button>

        <img
          id="output"
          alt="user_selection"
          className={`${selectedFile ? "previewImg" : "hideImg"}`}
          src={null}
        />
      </Grid>
      {error && (
        <Typography className="ErrorText">
          {error}
        </Typography>
      )}

    </Grid>
  );
};

export default PDropzone;
