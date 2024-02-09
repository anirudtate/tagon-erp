import { useSearchParams } from "react-router-dom";

export function useParamsState(searchParamName, defaultValue, type = "string") {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState) => {
    const next = Object.assign(
      {},
      [...searchParams.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    );
    setSearchParams(next);
  };
  if (type === "number") {
    return [Number(searchParamsState), setSearchParamsState];
  }
  return [searchParamsState, setSearchParamsState];
}
