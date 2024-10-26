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
      <Paragraph>Coin watch</Paragraph>
      <Input
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <MarketList
        markets={markets}
        onEndReached={() => !isFetching && searchTerm == '' && fetchNextPage()}
      />
      {(isFetching || coins.isFetching) ? <Spinner size='large'/> : null}
    </Main>
  )
}
