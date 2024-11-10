import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { get as cgGet } from '@/data/coinGeckoClient/client'
import { Market } from '@/data/coinGeckoClient/types'
import { defaultGetMarketsParams, DEFAULT_STALE_TIME } from '@/data/coinGeckoClient/utils'

export function useMarket(id: string): {
  market: Market | null,
  marketQuery: UseQueryResult
} {
  const query = useQuery({
    queryKey: ['/coins/markets', id],
    queryFn: ({queryKey}) => cgGet<Market[]>(
      queryKey[0] as string, {...defaultGetMarketsParams, ids: id}
    ),
    staleTime: DEFAULT_STALE_TIME,
  })

  return { market: query.data?.[0] ?? null, marketQuery: query}
}
