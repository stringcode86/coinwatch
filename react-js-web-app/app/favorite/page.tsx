'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useFavorites } from '@/app/favorite/hooks'
import { useMarkets } from '@/app/hooks'
import Nav from '@/components/Nav'
import Spinner from '@/components/Spinner'

export default function Favorite() {
  const { favorites } = useFavorites()
  const { markets, marketsQuery} = useMarkets(Array.from(favorites))
  const favoriteMarkets = favorites.size > 0 ? markets : []
  const isFetching = marketsQuery.isFetching

  return (
    <>
      <Nav title="Favorite"/>
      <main>
        <MarketCardList markets={favoriteMarkets} />
        <Spinner visible={isFetching} />
      </main>
    </>
  )
}