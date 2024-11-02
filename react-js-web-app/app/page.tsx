'use client'

import { useMarkets, useSearchCoins } from './hooks'
import { useState, useEffect } from 'react'
import { MarketCardList } from '@/components/MarketCardList'
import { TailSpin } from 'react-loader-spinner'
import Nav from "@/components/Nav";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const { coinIds, coinsQuery } = useSearchCoins(searchTerm)
  const { markets, marketsQuery } = useMarkets(coinIds)
  const isFetching = marketsQuery.isFetching || coinsQuery.isFetching
  const shouldFetchNext = !isFetching && searchTerm == ''

  const handleScroll = () => {
    const offset = window.innerHeight + window.scrollY
    if (offset >= document.body.scrollHeight && shouldFetchNext) {
      marketsQuery.fetchNextPage()
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching])

  return (
    <main>
      <Nav
        title="Coin Watch"
        inputVisible={true}
        inputHandler={(text) => setSearchTerm(text)}
        inputPlaceholder="Search coins"
      />
      <MarketCardList markets={markets} />
      <TailSpin visible={isFetching} color="black" wrapperClass="w-12 m-auto"/>
    </main>
  )
}
//           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
//           dark:text-white dark:focus:ring-blue-500 dark:focus:border-gray-500