import { Box, Button, Typography, useTheme } from "@mui/material";
import { Crumbs } from "../components/crumbs";
import { TableComponent } from "../components/table";
import { TextChip } from "../components/textChip";
import { useFetch } from "../hooks/useFetch";
import { order_status_url } from "../api/urls";
import moment from "moment";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { Actions } from "../components/actions";

export function OrderStatusDashboard() {
  const data = useFetch(order_status_url + `?limit=10`);
  const theme = useTheme();
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography variant="h5" fontWeight="600">
            Order status
          </Typography>
          <Crumbs />
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button size="small" variant="contained" sx={{ width: "110px" }}>
            Add new
          </Button>
        </Box>
      </Box>
      <TableComponent
        columns={[
          {
            headerName: "Action name",
            field: "action_name",
          },
          {
            headerName: "Icon color",
            field: "icon_color_code",
            renderCell: (params) => (
              <Box
                sx={{
                  height: "25px",
                  width: "25px",
                  borderRadius: "5px",
                  border: `1px solid gray`,
                  bgcolor: `#${params.value}`,
                }}
              />
            ),
          },
          {
            headerName: "Upload date",
            field: "updated_at",
            renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
          },
          {
            headerName: "Uploaded by",
            field: "created_at",
            renderCell: (params) => "Admin",
          },
          {
            headerName: "State",
            field: "is_active",
            renderCell: (params) => (
              <TextChip
                text={params.value ? "Active" : "Inactive"}
                color={
                  params.value
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              />
            ),
          },
          {
            headerName: "Actions",
            field: "actions",
            renderCell: (params) => (
              <Actions
                options={[
                  {
                    icon: Pencil,
                    name: "Edit",
                  },
                  {
                    icon: Copy,
                    name: "Clone",
                  },
                  {
                    icon: Trash2,
                    name: "Delete",
                  },
                ]}
              />
            ),
          },
        ]}
        rows={data.data?.results || []}
        loading={data.loading}
      />
    </Box>
  );
}
