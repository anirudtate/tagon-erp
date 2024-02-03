import { Box } from "@mui/material";

export function TextChip({ text, color }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: `${color}1a`,
        color: color,
        borderRadius: "5px",
        padding: "3px 10px",
        whiteSpace: "nowrap",
        fontSize: "12px",
      }}
    >
      {text}
    </Box>
  );
}
