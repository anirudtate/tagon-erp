import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api/api";
import { unknownError } from "../utils/unknownError";

export function useFetch(url, params = "") {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [refetcher, setRefetcher] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (url) {
      setLoading(true);
      setData(undefined);
      try {
        api
          .get(url + params, { cancelToken: source.token })
          .then((res) => {
            setLoading(false);
            res.data && setData(res.data);
          })
          .catch((err) => {
            setLoading(false);
            unknownError(err);
          });
      } catch (err) {
        setLoading(false);
        unknownError(err);
      }
    }
    return () => {
      source.cancel();
    };
  }, [url, refetcher, params]);

  const refetch = () => {
    setRefetcher((v) => !v);
  };

  return { data, loading, refetch };
}
