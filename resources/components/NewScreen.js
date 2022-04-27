import React from "react";
import { Box } from "native-base";

export default function NewScreen({ children }) {
  return (
    <Box flex="1" p="5">
      {children}
    </Box>
  );
}
