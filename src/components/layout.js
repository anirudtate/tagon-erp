import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
  cardClasses,
} from "@mui/material";
import { useState } from "react";
import { sidebarConfig } from "../config/sidebarConfig";
import {
  LogOut,
  Menu,
  MoonStar,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as DownArrowIcon } from "../images/downArrow.svg";
import { useLocalStorage } from "usehooks-ts";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userStore";
import { persistor } from "../redux/store";

export const drawerWidth = 240;

export function Layout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        [`.${cardClasses.root}`]: {
          bgcolor: "background.paper",
        },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.paper",
            display: "block",
          },
        }}
        open
      >
        <Sidebar />
      </Drawer>
      <Drawer
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.paper",
          },
        }}
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Sidebar />
      </Drawer>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { xs: `100%`, sm: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: `0`, sm: `${drawerWidth}px` },
          padding: { xs: `20px`, sm: `40px 60px` },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            height: "100%",
            flex: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: { xs: "10px", sm: "20px" } }}>
            <IconButton
              sx={{ display: { xs: "flex", sm: "none" } }}
              size="small"
              onClick={() => setMobileDrawerOpen(true)}
            >
              <Menu />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Search"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "background.paper",
                },
              }}
            />
            <ProfileSection />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

function ProfileSection() {
  const dispatch = useDispatch();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [themeVarient, setThemeVarient] = useLocalStorage("theme", "light");
  return (
    <>
      <Box
        sx={{ display: "flex", gap: "10px", cursor: "pointer" }}
        onClick={() => setMobileDrawerOpen(true)}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            borderRadius: "5px",
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : "none",
          }}
        >
          A
        </Avatar>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
          }}
        >
          <Typography noWrap fontWeight="bold" fontSize={14}>
            Anirud Tate
          </Typography>
          <Typography noWrap fontSize={12}>
            Ceo of PLS <DownArrowIcon style={{ height: "8px", width: "8px" }} />
          </Typography>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.paper",
          },
        }}
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ p: "20px" }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                borderRadius: "5px",
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : "none",
              }}
            >
              A
            </Avatar>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography noWrap fontWeight="bold" fontSize={14}>
                Anirud Tate
              </Typography>
              <Typography noWrap fontSize={12}>
                Ceo of PLS{" "}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ p: "5px" }} />
          <Divider />
          <Box sx={{ p: "5px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <Button
              variant="ghost"
              sx={{ justifyContent: "flex-start" }}
              startIcon={<User />}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              sx={{ justifyContent: "flex-start" }}
              startIcon={<Settings />}
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              sx={{ justifyContent: "flex-start" }}
              startIcon={<LogOut />}
              onClick={() => {
                dispatch(logout());
                persistor.flush().then(() => {
                  return persistor.purge();
                });
              }}
            >
              Log-out
            </Button>
            <Box sx={{ p: "5px" }} />
            <Box sx={{ display: "flex" }}>
              <Button
                sx={{ flex: 1 }}
                variant={themeVarient === "light" ? "contained" : "ghost"}
                startIcon={<Sun />}
                onClick={() => setThemeVarient("light")}
              >
                Light
              </Button>
              <Button
                sx={{ flex: 1 }}
                variant={themeVarient === "dark" ? "contained" : "ghost"}
                startIcon={<MoonStar />}
                onClick={() => setThemeVarient("dark")}
              >
                Dark
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box
      sx={{
        p: "20px",
        flexDirection: "column",
        gap: "5px",
        paddingTop: "40px",
        display: "flex",
      }}
    >
      {sidebarConfig.map((item, index) =>
        item.children ? (
          <ButtonWithPopOver key={index} item={item} index={index} />
        ) : (
          <Button
            key={index}
            variant={
              location.pathname.startsWith(item.path) ? "contained" : "ghost"
            }
            sx={{ justifyContent: "flex-start" }}
            startIcon={<item.icon />}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
          >
            {item.name}
          </Button>
        )
      )}
    </Box>
  );
}

function ButtonWithPopOver({ item, index }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const items = item.children;

  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        key={index}
        variant={
          location.pathname.startsWith(item.path) ? "contained" : "ghost"
        }
        sx={{ justifyContent: "flex-start" }}
        startIcon={<item.icon />}
        onClick={handleClick}
      >
        {item.name}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            p: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            width: drawerWidth,
          }}
        >
          {items.map((item, index) =>
            item.children ? (
              <ButtonWithPopOver key={index} item={item} index={index} />
            ) : (
              <Button
                key={index}
                variant="ghost"
                sx={{ justifyContent: "flex-start" }}
                startIcon={<item.icon />}
                onClick={() => {
                  handleClose();
                  if (item.path) {
                    navigate(item.path);
                  }
                }}
              >
                {item.name}
              </Button>
            )
          )}
        </Box>
      </Popover>
    </>
  );
}
