import {
  Button,
  Container,
  Image,
  ScrollView,
  XStack,
  H1,
  H2,
  YStack,
  Separator,
  SizableText,
  View
} from '@my/ui'
import { Star, StarFull } from '@tamagui/lucide-icons'
import { useMarket } from "app/features/market/hooks"
import { NumericFormat } from "react-number-format";
import { abbreviateNumber } from "app/utils/abbreviateNumber";
import { LineChart } from "react-native-svg-charts";
import { useTheme } from "@tamagui/core";
import { useMemo } from "react";
import { Market } from 'app/data/coinGeckoClient/types'

export function MarketDetailScreen({ id }: { id: string }) {
  const { market } = useMarket(id)
  const up = useMemo(
    () => (market?.price_change_percentage_24h ?? 1) > 0,
    [market?.price_change_percentage_24h]
  )

  const theme = useTheme()
  const chartColor = up ? theme.green10.get() : theme.red10.get()

  return (
    <ScrollView p="$4" contentContainerStyle={{ flexGrow: 1}}>
      <Container gap="$4" maw="860px" w="100%" style={{ margin: "0 auto" }}>
        <Header market={market}/>
        <Separator/>
        <YStack
          $gtXs={{flexDirection: 'row', flex: 1, alignItems: "flex-start"}}
          gap="$4"
        >
          <LineChart
            data={market?.sparkline_in_7d.price ?? []}
            style={{ flex: 2, aspectRatio: 1 }}
            svg={{ stroke: chartColor, strokeWidth: 2 }}
          />
          <Separator $gtXs={{display: "none"}}/>
          <Details market={market} pctCol={chartColor}/>
        </YStack>
        <View/>
      </Container>
    </ScrollView>
  )
}

function Header({market}: { market: Market | null}) {
  return (
    <XStack gap="$4" ai="flex-start">
      <Image source={{ uri: market?.image }} aspectRatio={1} minWidth="29%"/>
      <YStack f={1}>
        <H1 f={1}>{market?.name}</H1>
        <XStack jc="space-between" ai="center">
          <H2 tt="uppercase">{market?.symbol}</H2>
          <Star size="$3" color="$blue9"/>
        </XStack>
      </YStack>
    </XStack>
  )
}

function Details({market, pctCol}: {
  market: Market | null,
  pctCol: any | null
}) {
  const volume = abbreviateNumber(market?.market_cap ?? 0)
  const currSupply = abbreviateNumber(market?.circulating_supply ?? 0)
  const maxSupply = abbreviateNumber(market?.max_supply ?? 0)

  return (
    <YStack f={1}>
      <XStack f={1} jc="space-around">
        <SizableText w="33.33%">Price</SizableText>
        <NumericFormat
          displayType="text"
          value={market?.current_price}
          thousandsGroupStyle="lakh"
          thousandSeparator=","
          prefix={'$'}
          decimalScale={2} // TODO: Handle price 0.0000123
          renderText={(value) =>
            <SizableText w="33.33%">{value}</SizableText>
          }
        />
        <SizableText w="33.33%" color={pctCol}>
          {`${(market?.price_change_percentage_24h ?? 0).toFixed(2)}%`}
        </SizableText>
      </XStack>

      <XStack f={1} jc="space-around">
        <SizableText w="33.33%">Volume</SizableText>
        <SizableText w="33.33%">{volume}</SizableText>
        <SizableText w="33.33%">{market?.market_cap_rank}</SizableText>
      </XStack>

      <XStack f={1} jc="space-around">
        <SizableText w="33.33%">Supply</SizableText>
        <SizableText w="33.33%">{currSupply}</SizableText>
        <SizableText w="33.33%">{maxSupply}</SizableText>
      </XStack>

      <View minHeight="$2"></View>
    </YStack>
  )
}
