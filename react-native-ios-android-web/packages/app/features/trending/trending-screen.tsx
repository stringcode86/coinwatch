import { Main, Spinner } from '@my/ui'
import { useTrending } from 'app/features/trending/hooks'
import { useMarkets } from "app/features/home/hooks";
import MarketList from "app/components/MarketList";
import { RefreshControl } from "react-native";

export function TrendingScreen() {
  const { trendingIds, trendingQuery } = useTrending()
  const { markets, marketsQuery } = useMarkets(trendingIds)
  const isFetching = marketsQuery.isFetching || trendingQuery.isFetching

  return (
    <Main maxHeight="100vh">
      <MarketList
        markets={ isFetching ? [] : markets }
        footer={
          isFetching ? <Spinner size='large'/> : undefined
        }
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
