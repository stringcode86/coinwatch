'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useFavorites } from '@/app/favorite/hooks'
import { useMarkets } from '@/app/hooks'
import Nav from "@/components/Nav";

export default function Favorite() {
  const { favorites } = useFavorites()
  const { markets } = useMarkets(Array.from(favorites))

  return (
    <main>
      <Nav title="Favorite"/>
      <MarketCardList markets={markets} />
    </main>
  )
}