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

export { getExistingFileHandle };
