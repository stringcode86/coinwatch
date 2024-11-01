'use client'

import {MarketCardList} from '@/components/MarketCardList'
import {useFavorites} from '@/app/trending/hooks'
import {useMarkets} from '@/app/hooks'

export default function Trending() {
  const { favorites } = useFavorites()
  const { markets } = useMarkets(Array.from(favorites))

  return (
    <>
      <MarketCardList markets={markets} />
    </>
  )
}