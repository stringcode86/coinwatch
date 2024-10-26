import { Main, Spinner } from '@my/ui'
import { useMarkets } from "app/features/home/hooks";
import MarketList from "app/components/MarketList";

export function FavoriteScreen() {
  const coins = ['ethereum', 'solana', 'bitcoin']
  const { markets, isFetching } = useMarkets(coins)

  return (
    <Main maxHeight="100vh">
      <MarketList markets={markets}/>
      {(isFetching) ? <Spinner size='large'/> : null}
    </Main>
  )
}
