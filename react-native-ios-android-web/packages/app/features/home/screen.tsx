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
import { Platform } from 'react-native'
import { useLink } from 'solito/navigation'
import { useRouter } from 'solito/router'
import { get as cgGet } from '../../data/coinGeckoClient/client'
import { Market } from '../../data/coinGeckoClient/types'
import marketsJson from '../../data/markets.json'
import { defaultGetMarketsParams } from '../../data/coinGeckoClient/utils'
import {keepPreviousData, useInfiniteQuery, useQuery} from '@tanstack/react-query'
import MarketList from 'app/features/home/MarketList'

export function HomeScreen() {

  // List of markets query
  // const {data, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery({
  //   queryKey: ['/coins/markets'],
  //   queryFn: ({pageParam}) => cgGet<Market[]>(
  //     '/coins/markets', {...defaultGetMarketsParams, page: pageParam as number}
  //   ),
  //   getNextPageParam: (lastPage, pages) => pages.length + 1,
  //   initialPageParam: 1,
  //   placeholderData: keepPreviousData,
  // });

  // Search query

  // const markets: Market[] = data?.pages.reduce((a, c) => [...a, ...c], []) ?? []
  const markets = marketsJson
  console.log('[MARKETS count]', markets?.length)

  return (
    <YStack maxHeight='100vh'>
      <Paragraph>WTF</Paragraph>
      {markets ? (
        <MarketList
          markets={markets}
          onEndReached={() => !isFetching && fetchNextPage()}
        />
      ) : null}
      {(isFetchingNextPage || isFetching) ? <Paragraph>Loading</Paragraph> : null}
    </YStack>
  )
}

