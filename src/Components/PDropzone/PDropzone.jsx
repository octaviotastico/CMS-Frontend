// React
import React, { useState, useRef } from 'react';

// Material
import { Button, Grid, Typography } from '@material-ui/core';

// Styles
import './PDropzone.scss';

const PDropzone = ({ validTypes, images = false }) => {
  const [isInside, setIsInside] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileButton = useRef(null);

  if (images) {
    validTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif', 'image/svg', 'image/webp', 'image/bmp'];
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
    console.log('f', f);
    console.log('f.length', f.length);
    console.log('validateFile(f[0])', validateFile(f[0]));
    if (f.length === 1 && validateFile(f[0])) {
      setSelectedFile(f[0]);

      let dataURL = '';
      const reader = new FileReader();
      const output = document.getElementById('output');

      reader.onload = () => {
        dataURL = reader.result;
        output.src = dataURL;
      };

      reader.readAsDataURL(f[0]);
      output.src = dataURL;
    } else if (f.length > 1) {
      setError('Cannot select multiple files');
    } else if (!validateFile(f[0])) {
      setError('Invalid file type');
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

  console.log('selectedFile', selectedFile);

  return (
    <Grid className="PDropzone">
      <Grid
        className={`content ${isInside ? 'inside' : 'outside'}`}
        onDragEnter={() => setIsInside(true)}
        onDragLeave={() => setIsInside(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={fileDrop}
      >
        <img
          id="output"
          src="/icons/image-preview.svg"
          className="Placeholder"
          alt="Preview"
        />

        <Typography className="HelpText">
          Drag and drop your file here
        </Typography>

        <Typography className="HelpText">
          or...
        </Typography>

        <input
          type="file"
          ref={fileButton}
          style={{ display: 'none' }}
          onChange={inputTagFiles}
        />

        <Button onClick={fileSelectionButton} className="FileSelectionButton">
          Select a file from your device
        </Button>

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

// Image preview
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">
// Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">
// www.flaticon.com</a></div>

// Document preview
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">
// Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">
// www.flaticon.com</a></div>

// Videocall
// <div>Icons made by <a href="https://www.flaticon.com/authors/surang"
// title="surang">surang</a> from <a href="https://www.flaticon.com/"
// title="Flaticon">www.flaticon.com</a></div>

// Conference
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">
// Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">
// www.flaticon.com</a></div>
