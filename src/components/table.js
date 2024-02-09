import { useTheme } from "@emotion/react";
import { Box, TableContainer, useMediaQuery } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { ReactComponent as LoadingIcon } from "../images/loading.svg";

export function TableComponent({ columns, rows, loading }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  if (loading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingIcon height="70px" width="70px" />
      </Box>
    );
  }
  return (
    <TableContainer>
      <DataGrid
        columns={columns.map((c) => ({
          ...c,
          sortable: false,
          align: "center",
          headerAlign: "center",
          flex: matches ? 1 : 0,
        }))}
        rows={rows}
        disableRowSelectionOnClick
        hideFooter
        disableColumnMenu
        columnHeaderHeight={40}
        getRowHeight={() => "auto"}
        sx={{
          [`& .${gridClasses.virtualScroller}`]: {
            overflowY: "hidden",
          },
          [`& .${gridClasses.cell}`]: {
            py: 1,
            textAlign: "center",
          },
          [`& .${gridClasses.row}`]: {
            bgcolor: "background.paper",
            minHeight: "60px !important",
            fontSize: "12px",
          },
          [`& .${gridClasses.columnSeparator}`]: {
            display: "none",
          },
          [`& .${gridClasses.cell}:focus`]: {
            outline: "none",
          },
          [`& .${gridClasses.cell}:focus-within`]: {
            outline: "none",
          },
          [`& .${gridClasses.columnHeader}:focus`]: {
            outline: "none",
          },
          [`& .${gridClasses.columnHeaders}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.primary.main + "0d"
                : "none",
          },
          // [`& .${gridClasses.row}:hover`]: {
          //   bgcolor: (theme) => theme.palette.primary.main + "04",
          // },
        }}
      />
    </TableContainer>
  );
}
