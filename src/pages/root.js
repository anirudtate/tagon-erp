import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import loginImage from "../images/loginImage.gif";
import { useEffect, useState } from "react";
import { api, apiPublic } from "../api/api";
import { update_password_url, user_login_url } from "../api/urls";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userStore";
import { unknownError } from "../utils/unknownError";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeOff } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { persistor } from "../redux/store";

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
  "& .MuiLoadingButton-loading": {
    color: "#ffffff !important",
  },
});

export function Root() {
  return <PageLayout Form={LogInForm} />;
}

export function TemporaryPassword() {
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
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          disableElevation
          color="white"
        >
          Log In
        </LoadingButton>
      </Box>
    </form>
  );
}

function TemporaryPasswordForm() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const navigate = useNavigate();

  const token = decodeURIComponent(searchParams.get("token"));
  const pwd_temp = useSelector((state) => state.user.pwd_temp);

  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [oneError, setOneError] = useState("");
  const [twoError, setTwoError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);
  const dispatch = useDispatch();

  useEffect(() => {
    setOneError("");
  }, [passwordOne]);

  useEffect(() => {
    setTwoError("");
  }, [passwordTwo]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!passwordOne) {
      setOneError("This field is required");
      return;
    }
    if (!passwordTwo) {
      setTwoError("This field is required");
      return;
    }
    if (passwordOne !== passwordTwo) {
      setTwoError("Password and confirm password should be same");
      return;
    }

    setLoading(true);
    try {
      if (token === "null") {
        api
          .post(update_password_url, {
            passwordOne,
            confirm_password: passwordTwo,
          })
          .then((res) => {
            enqueueSnackbar(
              "Password has been resetted successfully. Please login using new password.",
              { variant: "success" }
            );
            dispatch(logout());
            persistor.flush().then(() => {
              return persistor.purge();
            });
            navigate("/");
            setLoading(false);
          })
          .catch((err) => {
            unknownError(err);
            setLoading(false);
          });
      } else {
        apiPublic
          .post(update_password_url, {
            token,
            passwordOne,
            confirm_password: passwordTwo,
          })
          .then((res) => {
            enqueueSnackbar(
              "Password has been resetted successfully. Please login using new password.",
              { variant: "success" }
            );
            dispatch(logout());
            persistor.flush().then(() => {
              return persistor.purge();
            });
            navigate("/");
            setLoading(false);
          })
          .catch((err) => {
            unknownError(err);
            setLoading(false);
          });
      }
    } catch (err) {
      unknownError(err);
      setLoading(false);
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
        <Typography variant="h3">Update Password</Typography>
        <Typography variant="p" fontSize={15}>
          {pwd_temp === true ? (
            <>
              You are using a temporarily assigned password. Please reset your
              password.
            </>
          ) : (
            <>Enter new password below to reset your password.</>
          )}
        </Typography>
        <Box sx={{ p: "5px" }} />
        <InputLabel sx={{ color: "#fff" }}>Password</InputLabel>
        <WhiteTextField
          size="small"
          type={showPasswordOne ? "text" : "password"}
          fullWidth
          placeholder="Password"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          error={!!oneError}
          helperText={oneError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPasswordOne}
                  edge="end"
                  sx={{ color: "#ffffff" }}
                >
                  {showPasswordOne ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ p: "2px" }} />
        <InputLabel sx={{ color: "#fff" }}>Confirm password</InputLabel>
        <WhiteTextField
          type={showPasswordTwo ? "text" : "password"}
          size="small"
          fullWidth
          placeholder="Confirm password"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
          error={!!twoError}
          helperText={twoError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPasswordTwo}
                  edge="end"
                  sx={{ color: "#ffffff" }}
                >
                  {showPasswordOne ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ p: "7px" }} />
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          disableElevation
        >
          Update Password
        </LoadingButton>
      </Box>
    </form>
  );
}
