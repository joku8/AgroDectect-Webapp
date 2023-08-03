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
import React, { useState } from "react";
import { getExistingFileHandle } from "../utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WrongLocationIcon from "@mui/icons-material/WrongLocation";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";

const FilePicker = ({
  cropSelected,
  cropSelector,
  file,
  setFile,
  location,
  setLocation,
  snackbar,
}) => {
  const handleSelectFile = async () => {
    const ret = await getExistingFileHandle();
    if (ret.status === true) {
      setFile(ret.content);
      snackbar("success", "File Selected ");
    } else {
      setFile(null);
    }
  };

  const [geolocationSupported, setGeolocationSupported] = useState(true);
  const [locationAdded, setLocationAdded] = useState(false);
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocationAdded(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          };
          console.log(locationData);
          setLocation(locationData);
          snackbar("success", "Location data shared!");
        },
        (error) => {
          // Handle geolocation error, if any.
          // For example, you could display an error message to the user.
          console.error("Error getting location:", error.message);
          setLocationAdded(false);
        }
      );
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
        spacing={2}
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
                  height: "30px",
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
                  height: "30px",
                }}
              >
                Select File
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{
                  height: "30px",
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
          xs={12}
          sx={{
            height: "30px",
          }}
          display="flex"
          justifyContent="right"
        >
          {file !== null ? (
            <Box display="flex" alignItems="center">
              <InsertDriveFileIcon />
              <Typography variant="caption">{file.name}</Typography>
            </Box>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          {/* Hello Next component */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilePicker;
