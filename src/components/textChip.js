import { Box, useTheme } from "@mui/material";

export function TextChip({ text, color }) {
  const theme = useTheme();
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
        minWidth: "80px",
        borderColor: color,
        border: theme.palette.mode === "dark" ? "1px solid" : "none",
      }}
    >
      {text}
    </Box>
  );
}
