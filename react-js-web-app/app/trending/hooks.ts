import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { get as cgGet} from "@/data/coinGeckoClient/client";
import { Coin, SearchResult } from "@/data/coinGeckoClient/types";

export function useTrending(): {
  trending: Coin[]
  trendingIds: string[]
  trendingQuery: UseQueryResult
} {
  const trendingQuery = useQuery({
    queryKey: ['/search/trending'],
    queryFn: ({queryKey}) => cgGet<SearchResult>(queryKey[0] as string, {}),
    staleTime: 6000
  })

  const trendingCoins: Coin[] = trendingQuery.data?.coins ?? []
  const ids: string[] = trendingCoins.map(({item}) => item.id).filter(item => item)

  return {
    trending: trendingCoins,
    trendingIds: ids,
    trendingQuery: trendingQuery
  }
}
