import { listLocations } from "../graphql/queries";
import {
  createLocation as createLocationMutation,
  deleteLocation as deleteLocationMutation,
} from "../graphql/mutations";

import { API } from "aws-amplify";

async function fetchLocations() {
  // List all items
  const allLocations = await API.graphql({
    query: listLocations,
  });
  return allLocations;
}

async function createLocation(data) {
  const newLocation = await API.graphql({
    query: createLocation,
    variables: {
      input: {
        long: data.long,
        lat: data.lat,
      },
    },
  });
  fetchLocations();
}

async function deleteLocation({ locations, id }) {
  const newLocations = locations.filter((location) => location.id !== id);
  await API.graphql({
    query: deleteLocationMutation,
    variables: { input: { id } },
  });
  return newLocations;
}

export { fetchLocations, createLocation, deleteLocation };
