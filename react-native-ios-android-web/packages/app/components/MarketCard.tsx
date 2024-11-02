import { Market } from 'app/data/coinGeckoClient/types'
import { memo, useMemo } from 'react'
import { abbreviateNumber } from 'app/utils/abbreviateNumber'
import { useTheme } from '@tamagui/core'
import { Card, Image, SizableText, View, XStack, YStack } from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { LineChart } from 'react-native-svg-charts'
import { NumericFormat } from 'react-number-format'

export type MarketCardProps = {
  market: Market,
  width: number
  onPress: () => void
}

export const MarketCard = memo(({market, width = 100, onPress }: MarketCardProps) => {
  const sm = width < 220
  const pad = sm ? "$3" : "$4"
  const fs = sm ? "$5" : "$7"
  const fssm = sm ? "$3" : "$5"

  const up = (market.price_change_percentage_24h ?? 1) > 0
  const marketCap =abbreviateNumber(market.market_cap ?? '')
  const volume = abbreviateNumber(market.total_volume ?? '')

  const pricePct = useMemo(
    () => `${(market.price_change_percentage_24h ?? 0).toFixed(2)}%`,
    [market.price_change_percentage_24h]
  )

  const theme = useTheme()
  const chartColor = up ? theme.green10.get() : theme.red10.get()

  return (
    <Card
      w={width}
      h={width}
      hoverStyle={{scale: 0.925}}
      pressStyle={{scale: 0.975}}
      animation="bouncy"
      p={pad}
      elevate
      onPress={onPress}
      bg="$background"
    >
      <Card.Background overflow={'hidden'} paddingTop="70%">
        <LinearGradient
          width="100%"
          height="100%"
          borderRadius="$4"
          colors={[ up ? '$green4' : '$red4', '$background']}
          start={[0, 1]}
          end={[0, 0]}
        />
      </Card.Background>

      <XStack gap={pad}>
        <YStack justifyContent="space-between">
          <Image source={{ uri: market.image }} w={pad} aspectRatio={1} />
          <SizableText size={fssm} col={chartColor}>{pricePct}</SizableText>
        </YStack>
        <YStack f={1}>
          <SizableText size={fs} fow="600" numberOfLines={1}>{market.name}</SizableText>
          <SizableText size={fssm}>cap { marketCap }</SizableText>
          <SizableText size={fssm}>vol { volume }</SizableText>
        </YStack>
      </XStack>

      <View f={1}>
        <LineChart
          data={market.sparkline_in_7d?.price ?? []}
          style={{height: '100%'}}
          svg={{ stroke: chartColor, strokeWidth: 2 }}
          contentInset={{ top: sm ? 8 : 16, bottom: sm ? 4 : 8 }}
          animate={true}
        />
        {/*<SizableText>Chart</SizableText>*/}
      </View>

      <Card.Footer>
        <XStack justifyContent="center" f={1}>
          <SizableText size={fs} fow="700" col={up ? '$green10' : '$red11'} >{up ? '▲ ' : '▼ '}</SizableText>
          <NumericFormat
            displayType="text"
            value={market.current_price}
            thousandsGroupStyle="lakh"
            thousandSeparator=","
            prefix={'$'}
            decimalScale={2} // TODO: Handle price 0.0000123
            renderText={(value) =>
              <SizableText size={fs} fow="700">{value}</SizableText>
            }
          />
        </XStack>
      </Card.Footer>

    </Card>
  )
})
