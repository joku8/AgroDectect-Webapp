import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#e9edc9",
        borderRadius: "10px",
      }}
      width="70%"
    >
      <Stack
        direction="column"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome to AgroDetect!
        </Typography>
        <Typography variant="subtitle1">
          Detect the problem and find the solution.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Header;
