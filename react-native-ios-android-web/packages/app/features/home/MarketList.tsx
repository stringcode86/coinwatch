import { getTokenValue } from '@tamagui/core'
import { useState } from 'react'
import { FlatList, type LayoutChangeEvent } from 'react-native'
import { Market } from 'app/data/coinGeckoClient/types'
import { smallCardSizeAndColCnt } from 'app/utils/smallCardSize'
import { useRouter } from "solito/navigation";
import { MarketCard } from 'app/features/home/MarketCard'

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
      columnWrapperStyle={{ justifyContent: 'space-evenly' }}
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
