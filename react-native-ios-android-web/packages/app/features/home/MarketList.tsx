import { getTokens } from '@tamagui/core'
import { useRef, useState } from 'react'
import { FlatList, type LayoutChangeEvent } from 'react-native'
import { Market } from '../../data/coinGeckoClient/types'
import { smallCardSizeAndColCnt } from '../../utils/smallCardSize'
import { Paragraph, YStack } from "@my/ui";
import {Link} from "solito/link";

type MarketCardProps = {
  id: string,
  name: string,
  symbol: string,
  width: number
}

const MarketCard = ({id, name, symbol, width=100}: MarketCardProps) => {
  return(
    <YStack width={width} style={{aspectRatio: 1, border: "1px solid black", backgroundColor: 'aqua'}}>
      <Link href={`/market/${id}`}>
        <Paragraph>{name}</Paragraph>
        <Paragraph>{symbol}</Paragraph>
      </Link>
    </YStack>
  )
}


type MarketListProps = {
  markets: Market[];
  onEndReached?: () => void;
};

const MarketList = ({ markets , onEndReached }: MarketListProps) => {
  const tokens = getTokens();
  const [cellWidth, setCellWidth] = useState(300);
  const [colNum, setColNum] = useState(2);
  const onLayout = (e: LayoutChangeEvent) => {
    const dims = smallCardSizeAndColCnt(e.nativeEvent.layout.width, tokens.space['4'].val);
    setCellWidth(dims.width);
    setColNum(dims.colCount);
    console.log('[ONLAYOUT]', dims)
  }

  return (
    <FlatList
      key={`FlatList-${colNum}`}
      data={markets}
      renderItem={({item}) => (
        <MarketCard
          id={item.id}
          name={item.name}
          symbol={item.symbol}
          width={cellWidth}
        />
      )}
      keyExtractor={(market) => `${colNum}-${market.id}`}
      onEndReached={onEndReached}
      numColumns={colNum}
      contentContainerStyle={{
        gap: tokens.space['4'].val,
        paddingTop: tokens.space['4'].val,
        paddingBottom: tokens.space['20'].val,
      }}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
      }}
      onLayout={onLayout}
    />
  );
};

export default MarketList;
