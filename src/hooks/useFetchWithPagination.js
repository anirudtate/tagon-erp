import { Box } from "@mui/material";
import { useParamsState } from "./useParamState";

const perPage = 20;
export function useFetchWithPagination() {
  const [page, setPage] = useParamsState(0);
  return {
    apiQuery: `limit=${perPage}&offset=${perPage * page}`,
    pagination: <Box>Pagination</Box>,
  };
}
