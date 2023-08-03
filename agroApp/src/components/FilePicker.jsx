import {
  Box,
  Button,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { getExistingFileHandle } from "../utils";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FilePicker = ({ cropSelected, cropSelector, file, setFile }) => {
  const handleSelectFile = async () => {
    const ret = await getExistingFileHandle();
    if (ret.status === true) {
      setFile(ret.content);
    } else {
      setFile(null);
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
