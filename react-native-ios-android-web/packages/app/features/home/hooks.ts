import { Coin, Market, SearchResult } from "app/data/coinGeckoClient/types";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { get as cgGet } from "app/data/coinGeckoClient/client";
import {defaultGetMarketsParams} from "app/data/coinGeckoClient/utils";

export function useMarkets(): {
  markets: Market[],
  isFetching: boolean,
  fetchNextPage: () => void,
} {
  const {data, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['/coins/markets'],
    queryFn: ({pageParam}) => cgGet<Market[]>(
      '/coins/markets', {...defaultGetMarketsParams, page: pageParam as number}
    ),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  })

  const markets: Market[] = data?.pages.reduce((a, c) => [...a, ...c], []) ?? []

  return {
    markets: markets,
    isFetching: isFetching || isFetchingNextPage,
    fetchNextPage: fetchNextPage
  }
}

export function useSearchCoins(searchTerm: string): { coins: Coin[] } {
  const searchQuery = useQuery({
    queryKey: ['/search', searchTerm],
    queryFn: ({queryKey}) => cgGet<SearchResult>(
      queryKey[0] as string, {query: queryKey[1] as string}
    ),
    enabled: searchTerm != ''
  })

  const searchCoins: Coin[] = searchQuery.data?.coins ?? []

  return {coins: searchCoins}
}