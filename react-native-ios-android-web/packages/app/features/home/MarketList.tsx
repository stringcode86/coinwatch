import { getTokenValue } from '@tamagui/core'
import { useState, memo, useMemo } from 'react'
import { FlatList, type LayoutChangeEvent } from 'react-native'
import { Market } from 'app/data/coinGeckoClient/types'
import { smallCardSizeAndColCnt } from 'app/utils/smallCardSize'
import { SizableText, Card, XStack, YStack, Image, View } from "@my/ui";
import { useRouter } from "solito/navigation";
import { NumericFormat } from 'react-number-format';
import { abbreviateNumber } from 'app/utils/abbreviateNumber'

type MarketCardProps = {
  market: Market,
  width: number
  onPress: () => void
}

const MarketCard = memo(({market, width = 100, onPress }: MarketCardProps) => {
  const sm = width < 220
  const pad = sm ? "$3" : "$4"
  const fs = sm ? "$5" : "$7"
  const fssm = sm ? "$3" : "$5"

  const marketCap = useMemo(
    () => abbreviateNumber(market.market_cap ?? ''),
    [market.market_cap]
  )

  const volume = useMemo(
    () => abbreviateNumber(market.total_volume ?? ''),
    [market.total_volume]
  )

  const pricePct = useMemo(
    () => `${(market.price_change_percentage_24h ?? 0).toFixed(2)}%`,
    [market.price_change_percentage_24h]
  )

  return (
    <Card
      w={width}
      h={width}
      hoverStyle={{scale: 0.925}}
      pressStyle={{scale: 0.975}}
      animation="bouncy"
      p={sm ? "$3" : "$4"}
      elevate
      onPress={onPress}
    >
        <XStack gap={pad}>
          <YStack justifyContent="space-between">
            <Image source={{ uri: market.image }} w={pad} aspectRatio={1} />
            <NumericFormat
              displayType="text"
              value={market.price_change_percentage_24h ?? ''}
              suffix={'%'}
              decimalScale={2}
              renderText={(value) => <SizableText size={fssm}>{value}</SizableText>}
            />
          </YStack>
          <YStack f={1}>
            <SizableText size={fs} fow="600" numberOfLines={1}>{market.name}</SizableText>
            <SizableText size={fssm}>cap { marketCap }</SizableText>
            <SizableText size={fssm}>vol { volume }</SizableText>
          </YStack>
        </XStack>

      <View f={1}>
        <SizableText> </SizableText>
      </View>

      <Card.Background>

      </Card.Background>

      <Card.Footer>
        <XStack justifyContent="center" f={1}>
          <NumericFormat
            displayType="text"
            value={market.current_price}
            thousandsGroupStyle="lakh"
            thousandSeparator=","
            prefix={`▲ $`}
            decimalScale={2} // TODO: Handle price 0.0000123
            renderText={(value) => <SizableText size={fs} fow="700">{value}</SizableText>}
          />
        </XStack>
      </Card.Footer>
    </Card>
  )
})


type MarketListProps = {
  markets: Market[];
  onEndReached?: () => void;
};

const MarketList = ({markets, onEndReached}: MarketListProps) => {
  const router = useRouter()
  const [prevWidth, setPrevWidth] = useState(0)
  const [cellWidth, setCellWidth] = useState(300)
  const [colNum, setColNum] = useState(2)
  const space = getTokenValue('$space.4')
  const onLayout = (e: LayoutChangeEvent) => {
    if (prevWidth == e.nativeEvent.layout.width) {
      return
    }
    const dims = smallCardSizeAndColCnt(e.nativeEvent.layout.width, space)
    setCellWidth(dims.width)
    setColNum(dims.colCount)
    setPrevWidth(e.nativeEvent.layout.width)
    console.log('[ONLAYOUT]', dims, e.nativeEvent.layout, space)
  }

  return (
    <FlatList
      key={`FlatList-${colNum}`}
      data={markets}
      renderItem={({item}) => (
        <MarketCard
          market={item}
          width={cellWidth}
          onPress={() => router.push(`/market/${item.id}`)}
        />
      )}
      keyExtractor={(market) => `${colNum}-${market.id}`}
      onEndReached={onEndReached}
      numColumns={colNum}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
      }}
      contentContainerStyle={{
        gap: space,
        paddingTop: space,
        paddingBottom: space,
      }}
      onLayout={onLayout}
    />
  );
};

export default MarketList;
