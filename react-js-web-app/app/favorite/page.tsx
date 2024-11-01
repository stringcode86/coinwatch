'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useFavorites } from '@/app/favorite/hooks'
import { useMarkets } from '@/app/hooks'

export default function Favorite() {
  const { favorites } = useFavorites()
  const { markets } = useMarkets(Array.from(favorites))

  return (
    <>
      <MarketCardList markets={markets} />
    </>
  )
}