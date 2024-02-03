import {
  Box,
  Card,
  Grid,
  Typography,
  useTheme,
  Button,
  CardActionArea,
  Avatar,
} from "@mui/material";
import { CircleOff, Package, PackageCheck, RotateCw } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TableComponent } from "../components/table";
import { TextChip } from "../components/textChip";

export function Dashboard() {
  const cardsData = [
    {
      label: "Total orders",
      value: 45,
      icon: Package,
      color: "#514EFF",
    },
    {
      label: "Cancelled orders",
      value: 10,
      icon: CircleOff,
      color: "#FF3535",
    },
    {
      label: "Rescheduled orders",
      value: "03",
      icon: RotateCw,
      color: "#0EA2F8",
    },
    {
      label: "Total delivered",
      value: "23",
      icon: PackageCheck,
      color: "#00E03F",
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <Typography variant="h5" fontWeight="bold">
        Welcome Anirud Tate !
      </Typography>
      <Grid container spacing="20px">
        {cardsData.map((d, index) => (
          <Grid key={index} item xs={6} lg={3}>
            <Card
              sx={{
                padding: "20px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <IconChip icon={d.icon} color={d.color} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography fontSize={12} color="GrayText" align="center">
                  {d.label}
                </Typography>
                <Typography fontWeight="bold" fontSize={20}>
                  {d.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Revenue
              </Typography>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Typography variant="p" fontWeight="bold">
                  2022
                </Typography>
                <Box
                  sx={{
                    height: "15px",
                    width: "15px",
                    borderRadius: "4px",
                    bgcolor: "primary.main",
                  }}
                />
                <Typography variant="p" fontWeight="bold">
                  2023
                </Typography>
                <Box
                  sx={{
                    height: "15px",
                    width: "15px",
                    borderRadius: "4px",
                    bgcolor: "secondary.main",
                  }}
                />
              </Box>
            </Box>
            <TotalRevenueChart />
          </Card>
        </Grid>
        <Grid item lg={7} xs={12}>
          <Card
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Recent orders
              </Typography>
              <Button variant="text">View all</Button>
            </Box>
            <Box sx={{ p: "10px" }} />
            <TableComponent
              columns={[
                {
                  headerName: "Order id",
                  field: "order_id",
                },
                {
                  headerName: "Image",
                  field: "image",
                  renderCell: (params) => (
                    <img src={params.row.image} alt="adf" height={50} />
                  ),
                },
                {
                  headerName: "Product details",
                  field: "name",
                },
                {
                  headerName: "Date",
                  field: "date",
                },
                {
                  headerName: "Status",
                  field: "status",
                  renderCell: (params) => (
                    <TextChip text={params.row.status} color="#FE6321" />
                  ),
                },
              ]}
              rows={[
                {
                  id: 1,
                  order_id: "123456",
                  image:
                    "https://m.media-amazon.com/images/I/81Q7WuKlezL._SX679_.jpg",
                  name: "Watch used by Anirud Tate",
                  date: "11/02/2024",
                  status: "In progress",
                },
                {
                  id: 2,
                  order_id: "123456",
                  image:
                    "https://m.media-amazon.com/images/I/81Q7WuKlezL._SX679_.jpg",
                  name: "Watch used by Anirud Tate",
                  date: "11/02/2024",
                  status: "In progress",
                },
                {
                  id: 3,
                  order_id: "123456",
                  image:
                    "https://m.media-amazon.com/images/I/81Q7WuKlezL._SX679_.jpg",
                  name: "Watch used by Anirud Tate",
                  date: "11/02/2024",
                  status: "In progress",
                },
              ]}
            />
          </Card>
        </Grid>
        <Grid item lg={5} xs={12}>
          <Card
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Notifications
              </Typography>
              <Button variant="text">View all</Button>
            </Box>
            <Box sx={{ p: "10px" }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <Card variant="outlined">
                <CardActionArea
                  sx={{ padding: "10px 15px", display: "flex", gap: "10px" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.text.primary
                          : "none",
                      fontSize: "15px",
                    }}
                  >
                    CW
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontSize={15}>
                      Shipment update
                    </Typography>
                    <Typography variant="p">Today 8.00 AM</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                    }}
                  />
                </CardActionArea>
              </Card>
              <Card variant="outlined">
                <CardActionArea
                  sx={{ padding: "10px 15px", display: "flex", gap: "10px" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.text.primary
                          : "none",
                      fontSize: "15px",
                    }}
                  >
                    CW
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontSize={15}>
                      Shipment update
                    </Typography>
                    <Typography variant="p">Today 8.00 AM</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                    }}
                  />
                </CardActionArea>
              </Card>
              <Card variant="outlined">
                <CardActionArea
                  sx={{ padding: "10px 15px", display: "flex", gap: "10px" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.text.primary
                          : "none",
                      fontSize: "15px",
                    }}
                  >
                    CW
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontSize={15}>
                      Shipment update
                    </Typography>
                    <Typography variant="p">Today 8.00 AM</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "10px",
                      width: "10px",
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                    }}
                  />
                </CardActionArea>
              </Card>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function TotalRevenueChart() {
  const theme = useTheme();
  const data = [
    {
      name: "Jan",
      2022: 4000,
      2023: 2400,
    },
    {
      name: "Feb",
      2022: 3000,
      2023: 1398,
    },
    {
      name: "Mar",
      2022: 2000,
      2023: 9800,
    },
    {
      name: "Apr",
      2022: 2780,
      2023: 3908,
    },
    {
      name: "May",
      2022: 1890,
      2023: 4800,
    },
    {
      name: "Jun",
      2022: 2390,
      2023: 3800,
    },
    {
      name: "Jul",
      2022: 3490,
      2023: 4300,
    },
    {
      name: "Aug",
      2022: 3490,
      2023: 4300,
    },
    {
      name: "Sep",
      2022: 3490,
      2023: 4300,
    },
    {
      name: "Oct",
      2022: 3490,
      2023: 4300,
    },
    {
      name: "Nov",
      2022: 3490,
      2023: 4300,
    },
    {
      name: "Dec",
      2022: 3490,
      2023: 4300,
    },
  ];
  return (
    <ResponsiveContainer height={350} width="100%">
      <AreaChart
        width={100}
        height={100}
        data={data}
        margin={{
          top: 40,
          right: 10,
          left: -10,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{
            fill: theme.palette.text.primary,
            fontSize: "12px",
            fontFamily: "Roboto",
          }}
        />
        <YAxis
          tick={{
            fill: theme.palette.text.primary,
            fontSize: "12px",
            fontFamily: "Roboto",
          }}
          tickLine={{
            display: "none",
          }}
          axisLine={{ display: "none" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            border: "none",
            borderRadius: "5px",
            padding: "20px",
          }}
        />
        <defs>
          <linearGradient id="blueGra" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.4}
            />
            <stop
              offset="50%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="pinkGra" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0.4}
            />
            <stop
              offset="50%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={theme.palette.secondary.main}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="2022"
          stroke="#514EFF"
          fill="url(#blueGra)"
          strokeWidth={3}
        />
        <Area
          type="monotone"
          dataKey="2023"
          stackId="1"
          stroke="#FF0079"
          fill="url(#pinkGra)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function IconChip({ icon: Icon, color }) {
  const size = "50px";
  return (
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: size,
        width: size,
        bgcolor: `${color}1a`,
        color: color,
        borderRadius: "50%",
        padding: "12px",
      }}
    >
      <Icon style={{ height: "100%", width: "100%" }} />
    </Box>
  );
}
