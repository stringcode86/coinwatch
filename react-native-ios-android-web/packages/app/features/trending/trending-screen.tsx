import { Main, Spinner } from '@my/ui'
import { useTrending } from 'app/features/trending/hooks'
import { useMarkets } from "app/features/home/hooks";
import MarketList from "app/components/MarketList";
import { RefreshControl } from "react-native";
import UNav from "app/components/UNav";

export function TrendingScreen() {
  const { trendingIds, trendingQuery } = useTrending()
  const { markets, marketsQuery } = useMarkets(trendingIds)
  const trendingMarkets = trendingIds.length > 0 ? markets : []
  const isFetching = marketsQuery.isFetching || trendingQuery.isFetching

  return (
    <Main maxHeight="100vh">
      <UNav title="Trending"/>
      <MarketList
        markets={ trendingMarkets }
        footer={ isFetching ? <Spinner size='large'/> : undefined}
        refreshControl={
          <RefreshControl
            onRefresh={marketsQuery.refetch}
            refreshing={isFetching}
          />
        }
      />
    </Main>
  )
}
