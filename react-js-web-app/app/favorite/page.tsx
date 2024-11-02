'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useFavorites } from '@/app/favorite/hooks'
import { useMarkets } from '@/app/hooks'
import { TailSpin } from 'react-loader-spinner'
import Nav from '@/components/Nav'

export default function Favorite() {
  const { favorites } = useFavorites()
  const { markets, marketsQuery} = useMarkets(Array.from(favorites))
  const isFetching = marketsQuery.isFetching

  return (
    <main>
      <Nav title="Favorite"/>
      <MarketCardList markets={markets} />
      <TailSpin visible={isFetching} color="black" wrapperClass="w-12 m-auto"/>
    </main>
  )
}