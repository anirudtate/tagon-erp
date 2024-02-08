// This file is the entry point
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { useLocalStorage } from "usehooks-ts";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { setup as apiSetup } from "./api/api";
import { SnackbarProvider } from "notistack";

function App() {
  const [themeVarient] = useLocalStorage("theme", "light");
  // material UI theme setup
  const light = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#514eff",
      },
      secondary: {
        main: "#FF0079",
      },
      background: {
        default: "#f3f6f9",
        paper: "#ffffff",
      },
      success: {
        main: "#03A326",
      },
      error: {
        main: "#d40511",
      },
      gray: {
        main: "#001b3c",
      },
      text: {
        primary: "#001b3c",
      },
      white: {
        main: "#ffffff",
        contrastText: "#514eff",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  });
  const dark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#514eff",
      },
      secondary: {
        main: "#FF0079",
      },
      background: {
        default: "#000000",
        paper: "#18181b",
      },
      success: {
        main: "#03A326",
      },
      error: {
        main: "#d40511",
      },
      gray: {
        main: "#001b3c",
      },
      text: {
        primary: "#F3F6F9",
      },
      white: {
        main: "#ffffff",
        contrastText: "#514eff",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  });
  return (
    <>
      {/* Material UI css reset */}
      <CssBaseline />
      <ThemeProvider theme={themeVarient === "light" ? light : dark}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        />
        <Provider store={store}>
          {/* Routes from routes.js */}
          <RouterProvider router={routes} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

apiSetup(store);

reportWebVitals();
