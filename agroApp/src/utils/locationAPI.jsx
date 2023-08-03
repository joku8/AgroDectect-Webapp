import { API } from "aws-amplify";

import { listLocations } from "../graphql/queries";
import {
  createLocation as createLocationMutation,
  deleteLocation as deleteLocationMutation,
} from "../graphql/mutations";

async function fetchLocations() {
  const apiData = await API.graphql({ query: listLocations });
  const locationsFromAPI = apiData.data.listLocations.items;
  return locationsFromAPI;
}

async function createLocation(data) {
  await API.graphql({
    query: createLocationMutation,
    variables: { input: data },
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
