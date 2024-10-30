import { Main, Spinner } from '@my/ui'
import { useMarkets } from 'app/features/home/hooks'
import MarketList from 'app/components/MarketList'
import {RefreshControl} from 'react-native'
import UNav from 'app/components/UNav'
import { useFavorites } from 'app/features/favorite/hooks'

export function FavoriteScreen() {
  const { favorites } = useFavorites()
  const { markets, marketsQuery } = useMarkets(Array.from(favorites))

  return (
    <Main maxHeight="100vh">
      <UNav title="Favorite"/>
      <MarketList
        markets={favorites.size == 0 ? [] : markets}
        footer={marketsQuery.isFetching ? <Spinner size='large'/> : undefined}
        refreshControl={
          <RefreshControl
            onRefresh={marketsQuery.refetch}
            refreshing={marketsQuery.isFetching}
          />
        }
      />
    </Main>
  )
}
