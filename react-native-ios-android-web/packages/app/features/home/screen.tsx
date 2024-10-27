import {Main, Spinner, Input, XStack, SizableText} from '@my/ui'
import {useState} from 'react'
import useDebouncedValue from "app/utils/debounce";
import MarketList from 'app/components/MarketList'
import { useMarkets, useSearchCoins } from 'app/features/home/hooks'
import { RefreshControl } from 'react-native'

export function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { coinIds, coinsQuery } = useSearchCoins(useDebouncedValue(searchTerm, 300))
  const { markets, marketsQuery } = useMarkets(coinIds)
  const isFetching = coinsQuery.isFetching || marketsQuery.isFetching

  return (
    <Main maxHeight="100vh" gap="$4">
      <MarketList
        markets={ (searchTerm != '' && isFetching) ? [] : markets }
        header={
          <XStack>
            <Input
              f={1}
              onChangeText={(text) => setSearchTerm(text)}
              value={searchTerm}
              marginHorizontal="$3"
            />
            <SizableText>{markets.length}</SizableText>
          </XStack>
        }
        footer={
          isFetching ? <Spinner size='large' p="$4"/> : undefined
        }
        refreshControl={
          (markets.length > 0)
            ? <RefreshControl onRefresh={marketsQuery.refetch} refreshing={isFetching}/>
            : undefined
        }
        onEndReached={
          () => !isFetching && searchTerm == '' && marketsQuery.fetchNextPage()
      }
      />
    </Main>
  )
}
