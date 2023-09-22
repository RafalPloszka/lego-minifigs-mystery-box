import "unfetch/polyfill";

import useSWR, { Fetcher } from "swr";

import { MinifigPartsResponse } from "../types";

export const useGetMinifigParts = (setNumber?: string) => {
  const fetcher: Fetcher<MinifigPartsResponse, string> = (url: string) =>
    fetch(url, {
      headers: {
        Authorization: `key ${import.meta.env.VITE_REBRICKABLE_API_KEY}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(`https://rebrickable.com/api/v3/lego/minifigs/${setNumber}/parts`, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};
