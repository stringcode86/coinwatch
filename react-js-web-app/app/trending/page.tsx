'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useTrending } from '@/app/trending/hooks'
import { useMarkets } from '@/app/hooks'
import Nav from '@/components/Nav'
import Spinner from '@/components/Spinner'

export default function Trending() {
  const { trendingIds, trendingQuery } = useTrending()
  const { markets, marketsQuery } = useMarkets(trendingIds)
  const trendingMarkets = trendingIds.length > 0 ? markets : []
  const isFetching = marketsQuery.isFetching || trendingQuery.isFetching

  return (
    <>
      <Nav title="Trending"/>
      <main>
        <MarketCardList markets={trendingMarkets} />
        <Spinner visible={isFetching} />
      </main>
    </>
  )
}