/** Get an existing file handle of an image to analyze
 *
 * @returns an object indicating status and the FileHandle if true
 */
const getExistingFileHandle = async () => {
  try {
    const options = {
      types: [
        {
          description: "Crop Image File",
          accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
          },
        },
      ],
    };

    const [fileHandle] = await window.showOpenFilePicker(options);
    return { status: true, content: fileHandle };
  } catch (error) {
    return { status: false, content: error.message };
  }
};

/** Read contents of a file handle
 *
 * @param {FileHanlde} imageFileHandle
 * @returns a URL of the image data
 */
const readImageContents = async (imageFileHandle) => {
  try {
    // Get the File object from the image file handle
    const imageFile = await imageFileHandle.getFile();

    // Read the image data as a Blob
    const imageBlob = await imageFile.arrayBuffer();

    // Convert the Blob to a data URL
    const imageUrl = URL.createObjectURL(new Blob([imageBlob]));

    // Return the image data URL
    return { status: true, content: imageUrl };
  } catch (error) {
    return { status: false, content: null };
  }
};

/** Get value from local storage provided a key
 *
 * @param {string} key to search for in local storage
 * @returns ALREADY PARSED data from local storage for given key, null if doesnt exist
 */
function getLocalStorage(key) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error getting data from local storage:", error);
    return null;
  }
}

/** Set value to local storage key
 *
 * @param {string} key to set data in local storage
 * @param {string} data THE ALREADY JSONIFIED data to set (i.e. must call JSON.stringify() before calling this)
 */
function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.error("Error setting data to local storage:", error);
  }
}

async function getLocation() {
  if (navigator.geolocation) {
    // Get the user's current geolocation
    const getPosition = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return getPosition
      .then((position) => {
        // Extract latitude and longitude from the geolocation position
        const data = {
          long: position.coords.longitude,
          lat: position.coords.latitude,
        };

        return {
          status: 0,
          content: data,
        };
      })
      .catch((error) => {
        return {
          status: 1,
          content: "Error getting location... Perhaps it needs to be enabled?",
        };
      });
  } else {
    return {
      status: 2,
      content: "Geolocation is not supported by your browser",
    };
  }
}

export {
  getExistingFileHandle,
  getLocalStorage,
  getLocation,
  readImageContents,
  setLocalStorage,
};
