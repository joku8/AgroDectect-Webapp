import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const USMap = ({ locations }) => {
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
          <TableContainer
            component={Paper}
            sx={{ height: "270px", overflow: "scroll" }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Latitude
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Longitude
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((coordinate) => (
                  <TableRow key={coordinate.id}>
                    <TableCell align="center">{coordinate.lat}</TableCell>
                    <TableCell align="center">{coordinate.long}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default USMap;
