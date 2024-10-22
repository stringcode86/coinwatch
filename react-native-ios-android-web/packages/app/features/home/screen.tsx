import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  SwitchThemeButton,
  SwitchRouterButton,
  XStack,
  YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp, X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Platform, TextInput } from 'react-native'
import { useLink } from 'solito/navigation'
import { useRouter } from 'solito/router'
import { get as cgGet } from 'app/data/coinGeckoClient/client'
import {Market, Coin, SearchResult} from 'app/data/coinGeckoClient/types'
import { defaultGetMarketsParams } from 'app/data/coinGeckoClient/utils'
import useDebouncedValue from "app/utils/debounce";
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import MarketList from 'app/features/home/MarketList'

export function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');

  // List of markets query
  const {data, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['/coins/markets'],
    queryFn: ({pageParam}) => cgGet<Market[]>(
      '/coins/markets', {...defaultGetMarketsParams, page: pageParam as number}
    ),
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  })

  // Search query
  const searchQuery = useQuery({
    queryKey: ['/search', useDebouncedValue(searchTerm, 500)],
    queryFn: ({queryKey}) => cgGet<SearchResult>(
      queryKey[0] as string, { query: queryKey[1] as string }
    ),
    enabled: searchTerm != ''
  })

  const markets: Market[] = data?.pages.reduce((a, c) => [...a, ...c], []) ?? []
  const searchCoins: Coin[] = searchQuery.data?.coins ?? []

  console.log('[MARKETS count]', markets.length)
  console.log('[COINS count]', searchCoins.length)

  return (
    <YStack maxHeight='100vh'>
      <Paragraph>Coin watch</Paragraph>
      <TextInput
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <MarketList
        markets={markets}
        onEndReached={() => !isFetching && fetchNextPage()}
      />
      {(isFetchingNextPage || isFetching) ? <Paragraph>Loading</Paragraph> : null}
    </YStack>
  )
}

