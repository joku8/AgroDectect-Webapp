import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const Header = ({ logOff }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#e9edc9",
        borderRadius: "10px",
      }}
      width="70%"
    >
      <Stack
        direction="row"
        display="flex"
        alignContent="center"
        justifyContent="space-between"
        padding="10px 10px 10px 10px"
      >
        <Stack direction="column" display="flex">
          <Typography variant="h4" fontWeight="bold">
            Welcome to AgroDetect!
          </Typography>
          <Typography variant="subtitle1">
            Detect the problem and find the solution.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          sx={{
            minHeight: "30px",
            maxHeight: "30px",
          }}
          onClick={() => {
            logOff();
          }}
        >
          Sign Out
        </Button>
      </Stack>
    </Box>
  );
};

export default Header;
