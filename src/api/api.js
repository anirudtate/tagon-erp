import axios from "axios";
import { logout, setAccessToken } from "../redux/userStore";
import { persistor } from "../redux/store";
import { base_url, refresh_token_url } from "./urls";

export const api = axios.create({
  baseURL: base_url,
});

export const apiPublic = axios.create({
  baseURL: base_url,
});

export const setup = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().user.accessToken;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (
        err.response &&
        err.response.status === 403 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const rs = await api.post(refresh_token_url, {
            refresh: store.getState().user.refreshToken,
          });

          const { access } = rs.data;

          dispatch(setAccessToken(access));

          return api(originalConfig);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            dispatch(logout());
            persistor.flush().then(() => {
              return persistor.purge();
            });
            return 0;
          }
          return Promise.reject(error);
        }
      } else if (
        err.response &&
        err.response.status === 403 &&
        originalConfig._retry
      ) {
        dispatch(logout());
        persistor.flush().then(() => {
          return persistor.purge();
        });
        return 0;
      }

      return Promise.reject(err);
    }
  );
};
