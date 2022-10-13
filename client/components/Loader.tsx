import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '10rem'}}
    >
      <CircularProgress />
    </Box>
  );
}
