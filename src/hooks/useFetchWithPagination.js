import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParamsState } from "./useParamState";

export function useFetchWithPagination(url, options = { perPage: 20 }) {
  const { perPage } = options;
  const [page, setPage] = useParamsState("page", 1, "number");
  const [pageCount, setPageCount] = useState(1);
  const data = useFetch(
    url +
      (url.includes("?") ? "&" : "?") +
      `limit=${perPage}&offset=${perPage * (page - 1)}`
  );
  useEffect(() => {
    if (data?.data?.count) {
      setPageCount(Math.ceil(data?.data?.count / perPage) || 1);
    }
  }, [data, perPage]);
  const prevPage = () => {
    setPage(page === 1 ? page : page - 1);
  };
  const nextPage = () => {
    setPage(page === pageCount ? page : page + 1);
  };
  const PageButton = ({ index }) => {
    return (
      <Button
        variant={index === page ? "contained" : "outlined"}
        size="small"
        sx={
          index !== page
            ? {
                bgcolor: "background.paper",
                color: "text.primary",
                border: (theme) =>
                  `0.5px solid ${theme.palette.text.primary}33`,
                minWidth: "30px",
                ":hover": {
                  border: (theme) =>
                    `0.5px solid ${theme.palette.text.primary}33`,
                },
              }
            : {
                minWidth: "30px",
              }
        }
        onClick={() => setPage(index)}
      >
        {index}
      </Button>
    );
  };

  if (page > pageCount || pageCount === 1) {
    return {
      data: data,
      pagination: null,
    };
  }
  return {
    data: data,
    pagination: (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowLeft />}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            border: (theme) => `0.5px solid ${theme.palette.text.primary}33`,
            px: "20px",
            ":hover": {
              border: (theme) => `0.5px solid ${theme.palette.text.primary}33`,
            },
          }}
          onClick={prevPage}
        >
          Prev
        </Button>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <PageButton index={1} />
          {page - 2 > 1 && "..."}
          {page - 1 > 1 && <PageButton index={page - 1} />}
          {page !== 1 && page !== pageCount && <PageButton index={page} />}
          {page + 1 < pageCount && <PageButton index={page + 1} />}
          {page + 2 < pageCount && "..."}
          <PageButton index={pageCount} />
        </Box>
        <Button
          variant="outlined"
          size="small"
          endIcon={<ArrowRight />}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            border: (theme) => `0.5px solid ${theme.palette.text.primary}33`,
            px: "20px",
            ":hover": {
              border: (theme) => `0.5px solid ${theme.palette.text.primary}33`,
            },
          }}
          onClick={nextPage}
        >
          Next
        </Button>
      </Box>
    ),
  };
}
