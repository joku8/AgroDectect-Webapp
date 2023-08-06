import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getExistingFileHandle,
  getLocation,
  readImageContents,
} from "../utils/utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";

import * as locationAPI from "../utils/locationAPI";

const textRepresentation = {
  blight: "Blight",
  commonrust: "Common Rust",
  grayleafspot: "Gray Leaf Spot",
  healthy: "Healthy",
  soybeancaterpillar: "Soybean Caterpillar",
  diabroticaspeciosa: "Diabrotica speciosa",
};

const Analyze = ({
  cropSelected,
  cropSelector,
  file,
  setFile,
  // location,
  setLocation,
  snackbar,
}) => {
  /** Image to display (preview before upload) */
  const [displayImage, setDisplayImage] = useState(null);

  const [prediction, setPrediction] = useState("");
  const [description, setDescription] = useState("");

  // Toggle to false if not supported (encounter error)
  const [geolocationSupported, setGeolocationSupported] = useState(true);
  // Location has been added (state should discourage adding a location again and again)
  const [locationAdded, setLocationAdded] = useState(false);
  // Location has been clicked. disable temporarily
  const [disableAddLocation, setDisableAddLocation] = useState(false);

  const reset = () => {
    /** Reset lication added so user can report another pest/disease */
    setLocationAdded(false);
    /** Reset current file data */
    setFile(null);
    setDisplayImage(null);
    setPrediction("");
    setDescription("");
  };

  useEffect(() => {
    if (file !== null) {
      setDisableAddLocation(false);
    }
  }, [file]);

  /** Get the user's current location and send to GraphQL */
  const handleGetLocation = async (e) => {
    e.preventDefault();
    if (file === null) {
      snackbar("warning", "Please upload an image to issue a report...");
      return;
    }
    /** Temporarily disable button so multiple requests not sent on consecutive clicks */
    setDisableAddLocation(true);

    try {
      const location = await getLocation();
      if (location.status === 0) {
        snackbar("success", "Thank you for sharing your location!");

        // Create the location and then fetch the updated list of locations
        await locationAPI.createLocation(location.content);
        const updatedLocations = await locationAPI.fetchLocations();
        setLocation(updatedLocations);
        setLocationAdded(true);
        setDisableAddLocation(false);
      } else if (location.status === 1) {
        snackbar("error", location.content);
      } else if (location.status === 2) {
        snackbar("error", location.content);
        setGeolocationSupported(false);
      }
    } catch (error) {
      console.error("Error while creating or fetching locations:", error);
      snackbar("error", "Something went wrong. Please try again later.");
    } finally {
      setDisableAddLocation(false);
    }
  };

  /** Handle file selection */
  const handleSelectFile = async () => {
    reset();
    /** Open file picker */
    const ret = await getExistingFileHandle();
    if (ret.status === true) {
      /** Set file handle to contents */
      setFile(ret.content);
      try {
        // Read the image file contents and get the data URL
        const result = await readImageContents(ret.content);
        if (result.status === true) {
          /** Set the display image data */
          setDisplayImage(result.content);
        } else {
          snackbar("error", "Error reading file contents...");
          console.error("Error reading file contents.");
        }
      } catch (error) {
        snackbar("error", "Error uploading file...");
        console.error("Error uploading file:", error);
      }
      snackbar("success", "File Selected ");
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      snackbar("warning", "Please select a file");
      return;
    }

    if (cropSelected === "") {
      snackbar("warning", "Please select a crop");
      return;
    }

    try {
      // Convert the FileHandle to a Blob
      const fileToBlob = await file.getFile();
      const blob = await fileToBlob.arrayBuffer();

      const formData = new FormData();
      formData.append("image", new Blob([blob]), file.name);
      formData.append("crop", JSON.stringify({ crop: cropSelected }));

      // Send the data to the Flask server
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      setPrediction(result.prediction);
      setDescription(result.description);
      snackbar("success", "Image uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      snackbar("error", "An error occurred during upload");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
      width="70%"
      height="300px"
    >
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="15px 15px 15px 15px"
        spacing={1}
      >
        <Grid item xs={12}>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">Analyze crop image</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ToggleButtonGroup
                color="primary"
                value={cropSelected}
                exclusive
                onChange={cropSelector}
                size="small"
                sx={{
                  minHeight: "30px",
                  maxHeight: "30px",
                }}
              >
                <ToggleButton value="corn">Corn</ToggleButton>
                <ToggleButton value="soybean">Soybean</ToggleButton>
              </ToggleButtonGroup>
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  handleSelectFile();
                }}
                sx={{
                  minHeight: "30px",
                  maxHeight: "30px",
                }}
              >
                Select File
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{
                  minHeight: "30px",
                  maxHeight: "30px",
                }}
                onClick={() => {
                  handleUpload();
                }}
              >
                Upload
              </Button>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  minHeight: "30px",
                  maxHeight: "30px",
                }}
                onClick={() => {
                  setFile(null);
                  cropSelector("");
                  setLocationAdded(false);
                  setDisplayImage(null);
                }}
              >
                New
              </Button>
              {!geolocationSupported ? (
                <IconButton>
                  <WrongLocationIcon fontSize="large" />
                </IconButton>
              ) : (
                ""
              )}
              {geolocationSupported && !locationAdded ? (
                <Tooltip
                  title="Help crowdsource data by adding your location"
                  placement="top"
                >
                  <IconButton
                    onClick={(e) => {
                      handleGetLocation(e);
                    }}
                    disabled={disableAddLocation}
                  >
                    <AddLocationIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {geolocationSupported && locationAdded ? (
                <Tooltip title="Location added!" placement="top">
                  <IconButton>
                    <WhereToVoteIcon color="success" fontSize="large" />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            minHeight: "30px",
            maxHeight: "30px",
          }}
          display="flex"
          justifyContent="left"
        >
          <Stack direction="column" spacing={2}>
            {file !== null ? (
              <Box display="flex" alignItems="center">
                <InsertDriveFileIcon />
                <Typography variant="caption">{file.name}</Typography>
              </Box>
            ) : (
              ""
            )}
            {displayImage && (
              <div style={{ height: "150px", width: "100%" }}>
                <img
                  src={displayImage}
                  alt="crop-upload"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
            )}
          </Stack>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            minHeight: "30px",
            maxHeight: "30px",
          }}
          display="flex"
          justifyContent="left"
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              {textRepresentation[prediction] || ""}
            </Typography>
            <Typography variant="body2">{description || ""}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analyze;
