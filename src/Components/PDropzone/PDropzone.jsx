// React
import React, { useState, useRef, useEffect } from "react";

// Material
import { InsertPhotoTwoTone } from "@mui/icons-material";
import { Button, Grid, Typography } from "@material-ui/core";

// Redux
import { useSelector } from "react-redux";

// API
import { API_URL } from "../../Utils/constants";

// Styles
import "./PDropzone.scss";

const PDropzone = ({
  setSelectedFile = null,
  validTypes = [],
  acceptImages = false,
  previouslySelectedImage = null,
}) => {
  const { theme } = useSelector((state) => state);
  const [imgSelected, setImgSelected] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const [error, setError] = useState(null);
  const fileButton = useRef(null);

  if (acceptImages) {
    validTypes = [
      ...validTypes,
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/svg",
      "image/webp",
      "image/bmp",
    ];
  }

  const fileSelectionButton = () => {
    fileButton.current.click();
  };

  const validateFile = (file) => {
    if (file && file.type) {
      return validTypes.indexOf(file.type) !== -1;
    }
    return false;
  };

  const handleFiles = (f) => {
    if (f.length === 1 && validateFile(f[0])) {
      setSelectedFile(f[0]);

      let dataURL = "";
      const reader = new FileReader();
      const output = document.getElementById("output");

      reader.onload = () => {
        dataURL = reader.result;
        output.src = dataURL;
      };

      reader.readAsDataURL(f[0]);
      output.src = dataURL;

      setImgSelected(true);
    } else if (f.length > 1) {
      setError("Cannot select multiple files");
      setImgSelected(false);
    } else if (!validateFile(f[0])) {
      setError("Invalid file type");
      setImgSelected(false);
    }
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

  useEffect(() => {
    if (previouslySelectedImage !== null) {
      const output = document.getElementById("output");
      output.src = `${API_URL}/${previouslySelectedImage}`;
      setImgSelected(true);
    }
  }, [previouslySelectedImage]);

  return (
    <Grid className={`PDropzone-${theme}`}>
      <Grid
        className={`content ${isInside ? "inside" : "outside"}`}
        onDragEnter={() => setIsInside(true)}
        onDragLeave={() => setIsInside(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={fileDrop}
      >
        <img
          src=""
          id="output"
          className={`Placeholder ${imgSelected ? "" : "HideImg"}`}
          alt="Preview"
        />

        {!imgSelected && <InsertPhotoTwoTone id="output" className="PlaceholderIcon" />}

        <Typography className="HelpText">Drag and drop your file here</Typography>

        <Typography className="HelpText">or...</Typography>

        <input type="file" ref={fileButton} style={{ display: "none" }} onChange={inputTagFiles} />

        <Button onClick={fileSelectionButton} className="FileSelectionButton">
          Select a file from your device
        </Button>
      </Grid>
      {error && <Typography className="ErrorText">{error}</Typography>}
    </Grid>
  );
};

export default PDropzone;
