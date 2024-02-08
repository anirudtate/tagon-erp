import { Box, IconButton, Tooltip } from "@mui/material";

export function Actions({ options }) {
  return (
    <Box sx={{ display: "flex", gap: "0px" }}>
      {options.map((option) => (
        <Tooltip title={option.name}>
          <IconButton sx={{ color: "text.primary" }}>
            <option.icon style={{ height: "15px", width: "15px" }} />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
