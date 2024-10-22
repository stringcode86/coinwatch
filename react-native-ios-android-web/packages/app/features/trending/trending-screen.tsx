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
import { useQuery } from "@tanstack/react-query";
import { get as cgGet } from "app/data/coinGeckoClient/client";
import {Market, SearchResult} from "app/data/coinGeckoClient/types";
import { defaultGetMarketsParams } from "app/data/coinGeckoClient/utils";

export function TrendingScreen() {

  const trendingQuery = useQuery({
    queryKey: ['/search/trending'],
    queryFn: ({queryKey}) => cgGet<SearchResult>(queryKey[0] as string, {}),
  })

  const coins = trendingQuery.data?.coins

  console.log('[TRENDING COIN RESULT]', coins?.length)

  return (
    <YStack maxHeight='100vh'>
      <Paragraph>Trending screen {coins?.length}</Paragraph>
    </YStack>
  )
}

