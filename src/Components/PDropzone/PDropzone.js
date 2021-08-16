import React, { useState, useRef } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import "./PDropzone.scss";

const PDropzone = ({ validTypes }) => {
  const [isInside, setIsInside] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
    }
  };

  return (
    <Grid className="PDropzone">
      <Grid
        className={`content ${isInside ? "inside" : "outside"}`}
        onDragEnter={() => setIsInside(true)}
        onDragLeave={() => setIsInside(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={fileDrop}
      >
        <Typography style={{ pointerEvents: "none" }}>
          Drag and drop here an image :D
        </Typography>

        <Typography style={{ pointerEvents: "none" }}>or...</Typography>

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
          className={`${selectedFile ? "previewImg" : "hideImg"}`}
          src={null}
        />
      </Grid>
    </Grid>
  );
};

export default PDropzone;
