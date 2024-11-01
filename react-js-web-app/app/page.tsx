'use client'

import { Market } from '@/data/coinGeckoClient/types'
import { useMarkets, useSearchCoins } from './hooks'
import { useState } from 'react'
import { MarketCardList } from '@/components/MarketCardList'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { coinIds, coinsQuery } = useSearchCoins(searchTerm)
  const { markets, marketsQuery } = useMarkets(coinIds)
  const isFetching = marketsQuery.isFetching || coinsQuery.isFetching
  const showRefresh = isFetching && markets.length > 0
  const shouldFetchNext = !isFetching && searchTerm == ''

  return (
    <>
      <MarketCardList markets={markets} />
    </>
  )
}
