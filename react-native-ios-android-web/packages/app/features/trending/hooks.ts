import { useQuery} from "@tanstack/react-query";
import { get as cgGet} from "app/data/coinGeckoClient/client";
import { Coin, SearchResult } from "app/data/coinGeckoClient/types";

export function useTrending(): { coins: Coin[] } {
  const trendingQuery = useQuery({
    queryKey: ['/search/trending'],
    queryFn: ({queryKey}) => cgGet<SearchResult>(queryKey[0] as string, {}),
  })

  return { coins: trendingQuery.data?.coins ?? [] }
}