import { Main, Spinner } from '@my/ui'
import { useMarkets } from "app/features/home/hooks";
import MarketList from "app/components/MarketList";
import {RefreshControl} from "react-native";
import UNav from "app/components/UNav";

export function FavoriteScreen() {
  const coins = ['ethereum', 'solana', 'bitcoin']
  const { markets, marketsQuery } = useMarkets(coins)
  const isFetching = marketsQuery.isFetching

  return (
    <Main maxHeight="100vh">
      <UNav title="Favorite"/>
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
