import {Paragraph, Main, Spinner } from '@my/ui'
import { useState } from 'react'
import { TextInput } from 'react-native'
import useDebouncedValue from "app/utils/debounce";
import MarketList from 'app/components/MarketList'
import { useMarkets, useSearchCoins } from 'app/features/home/hooks'

export function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { markets, isFetching, fetchNextPage } = useMarkets()
  const { coins } = useSearchCoins(useDebouncedValue(searchTerm, 500))

  return (
    <Main maxHeight="100vh">
      <Paragraph>Coin watch</Paragraph>
      <TextInput
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <MarketList
        markets={markets}
        onEndReached={() => !isFetching && fetchNextPage()}
      />
      {(isFetching) ? <Spinner size='large'/> : null}
    </Main>
  )
}

