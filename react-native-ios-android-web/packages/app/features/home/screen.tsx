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
import useDebouncedValue from "app/utils/debounce";
import MarketList from 'app/features/home/MarketList'
import { useMarkets, useSearchCoins } from 'app/features/home/hooks'

export function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const { markets, isFetching, fetchNextPage } = useMarkets()
  const { coins } = useSearchCoins(useDebouncedValue(searchTerm, 500))

  console.log('[MARKETS count]', markets.length)
  console.log('[SEARCH COINS count]', coins.length)

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
      {(isFetching) ? <Paragraph>Loading</Paragraph> : null}
    </YStack>
  )
}

