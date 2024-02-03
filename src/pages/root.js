import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import loginImage from "../images/login_image.gif";
import { useEffect, useState } from "react";
import { apiPublic } from "../api/api";
import { user_login_url } from "../api/urls";
import { useDispatch } from "react-redux";
import { login } from "../redux/userStore";
import { unknownError } from "../utils/unknownError";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeOff } from "lucide-react";

const authenticate = false;

const WhiteTextField = styled(TextField)({
  "& ::placeholder": {
    color: "#fff",
  },
  "& input": {
    color: "#fff",
  },
  color: "#fff",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
      color: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "& fieldset::placeholder": {
      color: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
  "& .MuiOutlinedInput-root.Mui-error": {
    "& fieldset": { border: "2px solid #ff9595" },
  },
  "& .Mui-error": {
    color: "#ff9595",
  },
  "& .MuiFormHelperText-root": {
    color: "#ff9595 !important",
  },
});

const WhiteButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#fff",
  },
}));

export function Root() {
  return <PageLayout Form={LogInForm} />;
}

export function TemproraryPassword() {
  return <PageLayout Form={TemporaryPasswordForm} />;
}

function PageLayout({ Form }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        p: "20px",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          flex: "60%",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={loginImage} width="80%" alt="login_image" />
      </Box>
      <Box
        sx={{
          flex: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: "20px",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          borderRadius: "10px",
        }}
      >
        <Form />
      </Box>
    </Box>
  );
}

function LogInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUserError("");
  }, [username]);

  useEffect(() => {
    setPassError("");
  }, [password]);

  if (authenticate) {
    return <Navigate to="/dashboard" />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!username) {
      setUserError("Username is required");
      return;
    }
    if (!password) {
      setPassError("Password is required");
      return;
    }
    try {
      setLoading(true);
      apiPublic
        .post(user_login_url, {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          dispatch(
            login({
              accessToken: res.data.auth.access,
              refreshToken: res.data.auth.refresh,
              username: username,
              pwd_temp: res.data.user.pwd_temp,
              permissions: res?.data?.user?.permissions || [],
            })
          );
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          setUserError(true);
          setPassError("Wrong username or password");
        });
    } catch (err) {
      unknownError(err);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Typography variant="h3">Welcome Back</Typography>
        <Typography variant="p" fontSize={15}>
          Enter your username and password to log in
        </Typography>
        <Box sx={{ p: "5px" }} />
        <InputLabel sx={{ color: "#fff" }}>Username</InputLabel>
        <WhiteTextField
          size="small"
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!userError}
          helperText={userError}
        />
        <Box sx={{ p: "2px" }} />
        <InputLabel sx={{ color: "#fff" }}>Password</InputLabel>
        <WhiteTextField
          type={showPassword ? "text" : "password"}
          size="small"
          fullWidth
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passError}
          helperText={passError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ color: "#ffffff" }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ p: "7px" }} />
        <WhiteButton
          loading={loading}
          type="submit"
          variant="contained"
          disableElevation
        >
          Log In
        </WhiteButton>
      </Box>
    </form>
  );
}

function TemporaryPasswordForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUserError("");
  }, [username]);

  useEffect(() => {
    setPassError("");
  }, [password]);

  if (authenticate) {
    return <Navigate to="/dashboard" />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!username) {
      setUserError("Username is required");
      return;
    }
    if (!password) {
      setPassError("Password is required");
      return;
    }
    try {
      setLoading(true);
      apiPublic
        .post(user_login_url, {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          dispatch(
            login({
              accessToken: res.data.auth.access,
              refreshToken: res.data.auth.refresh,
              username: username,
              pwd_temp: res.data.user.pwd_temp,
              permissions: res?.data?.user?.permissions || [],
            })
          );
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          setUserError(true);
          setPassError("Wrong username or password");
        });
    } catch (err) {
      unknownError(err);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Typography variant="h3">Welcome Back</Typography>
        <Typography variant="p" fontSize={15}>
          Enter your username and password to log in
        </Typography>
        <Box sx={{ p: "5px" }} />
        <InputLabel sx={{ color: "#fff" }}>Username</InputLabel>
        <WhiteTextField
          size="small"
          fullWidth
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!userError}
          helperText={userError}
        />
        <Box sx={{ p: "2px" }} />
        <InputLabel sx={{ color: "#fff" }}>Password</InputLabel>
        <WhiteTextField
          type={showPassword ? "text" : "password"}
          size="small"
          fullWidth
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passError}
          helperText={passError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ color: "#ffffff" }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ p: "7px" }} />
        <WhiteButton
          loading={loading}
          type="submit"
          variant="contained"
          disableElevation
        >
          Log In
        </WhiteButton>
      </Box>
    </form>
  );
}
