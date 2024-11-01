'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useFavorites } from '@/app/trending/hooks'
import { useMarkets } from '@/app/hooks'
import Nav from '@/components/Nav'

export default function Trending() {
  const { favorites } = useFavorites()
  const { markets } = useMarkets(Array.from(favorites))

  return (
    <main>
      <Nav title="Trending"/>
      <MarketCardList markets={markets} />
    </main>
  )
}