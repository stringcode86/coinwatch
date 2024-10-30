import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { get as cgGet } from 'app/data/coinGeckoClient/client'
import { Market } from 'app/data/coinGeckoClient/types'
import { defaultGetMarketsParams } from 'app/data/coinGeckoClient/utils'
import { useStore } from 'app/data/store'

export function useMarket(id: string): {
  market: Market | null,
  marketQuery: UseQueryResult
} {
  const query = useQuery({
    queryKey: ['/coins/markets', id],
    queryFn: ({queryKey}) => cgGet<Market[]>(
      queryKey[0] as string, {...defaultGetMarketsParams, ids: id}
    ),
    staleTime: 60000,
  })

  return { market: query.data?.[0] ?? null, marketQuery: query}
}
