import { keepPreviousData, useInfiniteQuery, useQuery, UseQueryResult } from '@tanstack/react-query'
import { UseInfiniteQueryResult } from '@tanstack/react-query/src/types'
import { Coin, Market, SearchResult } from '@/data/coinGeckoClient/types'
import { get as cgGet } from '@/data/coinGeckoClient/client'
import { defaultGetMarketsParams, DEFAULT_STALE_TIME } from '@/data/coinGeckoClient/utils'
import { useMemo } from 'react'

export function useMarkets(ids: string[] | null = null): {
  markets: Market[],
  marketsQuery: UseInfiniteQueryResult
} {
  const query = useInfiniteQuery({
    queryKey: ['/coins/markets', ids],
    queryFn: ({pageParam}: {pageParam: number}) => cgGet<Market[]>(
      '/coins/markets', {
        ...defaultGetMarketsParams,
        ids: ids,
        page: pageParam
      }
    ),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    staleTime: DEFAULT_STALE_TIME,
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
    staleTime: DEFAULT_STALE_TIME
  })

  const searchCoins: Coin[] = searchQuery.data?.coins ?? []
  const ids: string[] | null = useMemo(
    () => searchCoins.map(item => item.id).filter(item => item),
    [searchCoins]
  )
  return { coinIds: ids, coins: searchCoins, coinsQuery: searchQuery }
}
