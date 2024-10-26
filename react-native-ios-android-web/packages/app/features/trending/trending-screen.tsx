import { Main, Spinner } from '@my/ui'
import { useTrending } from 'app/features/trending/hooks'
import { useMarkets } from "app/features/home/hooks";
import MarketList from "app/components/MarketList";

export function TrendingScreen() {
  const { coins } = useTrending()
  const { markets, isFetching } = useMarkets(coins.map(({item}) => item.id))

  return (
    <Main maxHeight="100vh">
      <MarketList markets={markets}/>
      {(isFetching) ? <Spinner size='large'/> : null}
    </Main>
  )
}
