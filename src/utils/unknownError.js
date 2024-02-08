import { enqueueSnackbar } from "notistack";

export function unknownError() {
  return enqueueSnackbar("Something went wrong", { variant: "error" });
}
