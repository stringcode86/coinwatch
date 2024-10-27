import { Coin, Market, SearchResult } from "app/data/coinGeckoClient/types";
import { keepPreviousData, useInfiniteQuery, useQuery, UseQueryResult } from "@tanstack/react-query";
import { get as cgGet } from "app/data/coinGeckoClient/client";
import { defaultGetMarketsParams } from "app/data/coinGeckoClient/utils";
import { UseInfiniteQueryResult } from "@tanstack/react-query/src/types";
import { useMemo } from "react";

export function useMarkets(ids: string[] | null = null): {
  markets: Market[],
  marketsQuery: UseInfiniteQueryResult
} {
  const query = useInfiniteQuery({
    queryKey: ['/coins/markets', ids],
    queryFn: ({pageParam}) => cgGet<Market[]>(
      '/coins/markets', {
        ...defaultGetMarketsParams,
        ids: ids as any,
        page: pageParam as number
      }
    ),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    staleTime: 60000
  })

  const markets: Market[] = useMemo(
    () => query.data?.pages.reduce((a, c) => [...a, ...c], []) ?? [],
    [query.data?.pages]
  )

  return {
    markets: markets,
    marketsQuery: query,
  }
}

export function useSearchCoins(searchTerm: string): {
  coinIds: string[]
  coins: Coin[]
  coinsQuery: UseQueryResult
} {
  const searchQuery = useQuery({
    queryKey: ['/search', searchTerm],
    queryFn: ({queryKey}) => cgGet<SearchResult>(
      queryKey[0] as string, {query: queryKey[1] as string}
    ),
    enabled: searchTerm != '',
    staleTime: 60000
  })

  const searchCoins: Coin[] = searchQuery.data?.coins ?? []
  const ids: string[] | null = useMemo(
    () => searchCoins.map(item => item.id).filter(item => item),
    [searchCoins]
  )
  return { coinIds: ids, coins: searchCoins, coinsQuery: searchQuery }
}