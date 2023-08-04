import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box, Grid } from "@mui/material";
import * as locationAPI from "../utils/locationAPI";

const containerStyle = {
  width: "100%",
  height: "420px",
};

const center = {
  lat: 39.8283,
  lng: -98.5795,
};

function USmap({ setLocations, locations }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return isLoaded ? (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
      width="70%"
      height="450px"
    >
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="15px 15px 15px 15px"
        spacing={2}
      >
        {" "}
        <Grid item xs={12}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={{
                  lat: parseFloat(location.lat),
                  lng: parseFloat(location.long),
                }}
                onClick={async () => {
                  const newLocations = locations.filter(
                    (loc) => loc.id !== location.id
                  );
                  setLocations(newLocations);
                  locationAPI.deleteLocation(location.id);
                }}
              />
            ))}{" "}
            <></>
          </GoogleMap>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}

export default React.memo(USmap);
