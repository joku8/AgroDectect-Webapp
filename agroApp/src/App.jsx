import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";

import { Grid } from "@mui/material";
import Analyze from "./components/Analyze";
import USmap from "./components/USmap";
import Feedback from "./components/Feedback";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function App({ signOut }) {
  // Global Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarKey, setSnackbarKey] = useState(0); // To manage the key prop

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const snackbarMessage = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setSnackbarKey((prevKey) => prevKey + 1); // Update the key to trigger Snackbar replacement
    setShowSnackbar(true);
  };

  /** Crop selected (used to decide which ml to run) */
  const [selectedCrop, setSelectedCrop] = useState("");

  /** Handles changing crop selection */
  const handleChangeCrop = (event, newCrop) => {
    if (newCrop === null) {
      return;
    }
    setSelectedCrop(newCrop);
  };

  /** The file handle of the image uploaded */
  const [selectedFileHandle, setSelectedFileHandle] = useState(null);

  /** List of locations retrieved from GraphQL */
  const [listLocations, setListLications] = useState([]);

  // // const [prediction, setPrediction] = useState("");
  // // const [description, setDescription] = useState("");

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        paddingTop="15px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Header logOff={signOut} />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Analyze
            cropSelected={selectedCrop}
            cropSelector={handleChangeCrop}
            file={selectedFileHandle}
            setFile={setSelectedFileHandle}
            location={listLocations}
            setLocation={setListLications}
            snackbar={snackbarMessage}
          />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <USmap locations={listLocations} />
        </Grid>
      </Grid>
      <Feedback
        feedbackKey={snackbarKey}
        open={showSnackbar}
        severity={severity}
        message={message}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}

export default withAuthenticator(App);
