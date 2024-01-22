import React from "react";
// import { Label, Box, DropZone } from "admin-bro";
import { Label, Box, DropZone } from "@admin-bro/design-system";

const photoLocation = (props) => {
  const { property, onChange, record } = props;

  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0]);
  };

  return (
    <Box style={{ paddingBottom: "3rem" }}>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange} />
    </Box>
  );
};

export default photoLocation;
