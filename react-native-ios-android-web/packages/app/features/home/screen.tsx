import {Main, Spinner, Input } from '@my/ui'
import { useEffect, useState} from 'react'
import MarketList from 'app/components/MarketList'
import { useMarkets, useSearchCoins } from 'app/features/home/hooks'
import { RefreshControl} from 'react-native'
import UNav from "app/components/UNav";

export function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { coinIds, coinsQuery } = useSearchCoins(searchTerm)
  const { markets, marketsQuery } = useMarkets(coinIds)
  const isFetching = marketsQuery.isFetching || coinsQuery.isFetching
  const showRefresh = isFetching && markets.length > 0
  const shouldFetchNext = !isFetching && searchTerm == ''

  return (
    <Main maxHeight="100vh" gap="$4">
      <UNav/>
      <MarketList
        markets={ markets }
        header={ SearchHeader((text) => setSearchTerm(text)) }
        footer={ isFetching ? <Spinner size='large' p="$4"/> : undefined }
        refreshControl={
          <RefreshControl
            onRefresh={marketsQuery.refetch}
            refreshing={showRefresh}
          />
        }
        onEndReached={
          () => shouldFetchNext && marketsQuery.fetchNextPage()
        }
      />
    </Main>
  )
}


function SearchHeader(debouncedTextHandler:(text: string) => void) {
  const [term, setTerm] = useState('');
  const delay = 300

  useEffect(() => {
    const handler = setTimeout(() => debouncedTextHandler(term), delay)
    return () => clearTimeout(handler)
  }, [term, 300])

  return (
    <Input
      onChangeText={(text) => setTerm(text)}
      value={term}
      placeholder="Search coins"
      clearButtonMode="while-editing"
      mx="$4"
    />
  )
}
