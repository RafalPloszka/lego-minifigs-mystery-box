import "unfetch/polyfill";

import useSWR, { Fetcher } from "swr";

import { MinifigsResponse } from "../types";

const HARRY_POTTER_THEME_ID = "246";

export const useGetMiniFigs = (shouldFetch: boolean) => {
  const fetcher: Fetcher<MinifigsResponse, string> = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
      },
    }).then((res) => res.json());

  const { data, isLoading, error } = useSWR(
    shouldFetch ? `https://rebrickable.com/api/v3/lego/minifigs/?in_theme_id=${HARRY_POTTER_THEME_ID}` : null,
    fetcher,
  );

  return {
    data,
    isLoading,
    error,
  };
};
