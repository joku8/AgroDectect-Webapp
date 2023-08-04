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
  getLocalStorage,
  readImageContents,
  setLocalStorage,
} from "../utils/utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";

import * as locationAPI from "../utils/locationAPI";

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

  /** Handle file selection */
  const handleSelectFile = async () => {
    /** Reset current file data */
    setFile(null);
    setDisplayImage(null);
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

  /** Upload file (send request to ml server) */
  const handleUpload = async () => {
    if (!file) {
      snackbar("warning", "Please select a file");
      return;
    }

    if (cropSelected === "") {
      snackbar("warning", "Please select a crop");
      return;
    }

    snackbar("info", "Integrate ML server here!");
  };

  /** Watch for changes in location and update local location variable from GraphQL */
  useEffect(() => {
    async function fetchData() {
      const ret = await locationAPI.fetchLocations();
      setLocation(ret);
    }
    fetchData();
  }, [setLocation]);

  // Toggle to false if not supported (encounter error)
  const [geolocationSupported, setGeolocationSupported] = useState(true);
  // Location has been added (state should discourage adding a location again and again)
  const [locationAdded, setLocationAdded] = useState(
    getLocalStorage("addedLocation") === null
      ? false
      : getLocalStorage("addedLocation")
  );
  // Location has been clicked. disable temporarily
  const [disableAddLocation, setDisableAddLocation] = useState(false);

  /** Sync local storage with location added check variable */
  useEffect(() => {
    setLocalStorage("addedLocation", JSON.stringify(locationAdded));
  }, [locationAdded]);

  /** Get the user's current location and send to GraphQL */
  const handleGetLocation = () => {
    /** Temporarily disable button so multiple requests not sent on consecutive clickss */
    setDisableAddLocation(true);
    if (navigator.geolocation) {
      // Get the user's current geolocation
      const getPosition = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      getPosition
        .then((position) => {
          // Extract latitude and longitude from the geolocation position
          const data = {
            long: position.coords.longitude,
            lat: position.coords.latitude,
          };

          // Create the location
          return locationAPI.createLocation(data);
        })
        .then(() => {
          // Fetch the updated list of locations
          return locationAPI.fetchLocations();
        })
        .then((ret) => {
          // Update the state with the new list of locations
          setLocation(ret);

          // Indicate that the location was successfully added
          setLocationAdded(true);

          // Send user feedback
          snackbar("success", "Thanks for adding your location!");
        })
        .catch((error) => {
          // Handle geolocation error or any other error that occurred
          snackbar("error", "Error getting location...");
          console.error("Error getting location:", error.message);
          setLocationAdded(false);
        });
    } else {
      // Handle geolocation not supported by the browser.
      // For example, you could display an error message to the user.
      snackbar("error", "Geolocation is not supported by your browser");
      setGeolocationSupported(false);
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
                <ToggleButton value="Corn">Corn</ToggleButton>
                <ToggleButton value="Soybean">Soybean</ToggleButton>
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
                    onClick={() => {
                      handleGetLocation();
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
          justifyContent="right"
        >
          {" "}
          {/* Hello Next component */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analyze;
