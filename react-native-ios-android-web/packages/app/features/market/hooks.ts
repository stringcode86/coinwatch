import { useQuery } from "@tanstack/react-query";
import { get as cgGet } from "app/data/coinGeckoClient/client";
import { Market } from "app/data/coinGeckoClient/types";
import { defaultGetMarketsParams } from "app/data/coinGeckoClient/utils";

export function useMarket(id: string): { market: Market | null } {
  const markets = useQuery({
    queryKey: ['/coins/markets', id],
    queryFn: ({queryKey}) => cgGet<Market[]>(
      queryKey[0] as string, {...defaultGetMarketsParams, ids: id}
    ),
    staleTime: 60000,
  })

  return { market: markets.data?.[0] ?? null }
}