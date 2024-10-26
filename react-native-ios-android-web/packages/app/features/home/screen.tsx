import {Paragraph, Main, Spinner, Input } from '@my/ui'
import {useMemo, useState} from 'react'
import useDebouncedValue from "app/utils/debounce";
import MarketList from 'app/components/MarketList'
import { useMarkets, useSearchCoins } from 'app/features/home/hooks'

export function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const coins = useSearchCoins(useDebouncedValue(searchTerm, 300))
  const ids: string[] | null = useMemo(
    () => coins.coins.map(item => item.id).filter(item => item),
    [coins]
  )
  const { markets, isFetching, fetchNextPage } = useMarkets(ids)

  return (
    <Main maxHeight="100vh" gap="$4">
      <MarketList
        markets={ (searchTerm != '' && (coins.isFetching || isFetching)) ? [] : markets }
        header={
          <Input
            onChangeText={(text) => setSearchTerm(text)}
            on
            value={searchTerm}
            marginHorizontal="$3"
          />
        }
        footer={
          (isFetching || coins.isFetching) ? <Spinner size='large' p="$4"/> : undefined
        }
        onEndReached={() => !isFetching && searchTerm == '' && fetchNextPage()}
      />
    </Main>
  )
}
