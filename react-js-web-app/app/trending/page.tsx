'use client'

import { MarketCardList } from '@/components/MarketCardList'
import { useTrending } from '@/app/trending/hooks'
import { useMarkets } from '@/app/hooks'
import { TailSpin } from 'react-loader-spinner'
import Nav from '@/components/Nav'

export default function Trending() {
  const { trendingIds, trendingQuery } = useTrending()
  const { markets, marketsQuery } = useMarkets(trendingIds)
  const isFetching = marketsQuery.isFetching || trendingQuery.isFetching

  return (
    <>
      <Nav title="Trending"/>
      <main>
        <MarketCardList markets={markets} />
        <TailSpin visible={isFetching} color="var(background2)" wrapperClass="w-12 m-auto"/>
      </main>
    </>
  )
}