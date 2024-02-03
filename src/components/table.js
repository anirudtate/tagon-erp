import { useTheme } from "@emotion/react";
import { TableContainer, useMediaQuery } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

export function TableComponent({ columns, rows }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
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
          [`& .${gridClasses.cell}`]: {
            py: 1,
            textAlign: "center",
          },
          [`& .${gridClasses.columnSeparator}`]: {
            display: "none",
          },
          [`& .${gridClasses.cell}:focus`]: {
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
