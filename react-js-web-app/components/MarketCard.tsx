import { memo, useMemo } from 'react'
import { Market } from '@/data/coinGeckoClient/types'
import { useComponentSize } from '@/utils/useComponentSize'
import { abbreviateNumber } from '@/utils/abbreviateNumber'
import { NumericFormat } from 'react-number-format'
import Chart from '@/components/Chart'
import Link from 'next/link'

export type MarketCardProps = {
  market: Market,
  onPress?: () => void
}

export const MarketCard = memo(({market, onPress }: MarketCardProps) => {
  const up = (market.price_change_percentage_24h ?? 1) > 0
  const marketCap =abbreviateNumber(market.market_cap ?? '')
  const volume = abbreviateNumber(market.total_volume ?? '')
  const chartColor = up ? 'green' : 'red'

  const pricePct = useMemo(
    () => `${(market.price_change_percentage_24h ?? 0).toFixed(2)}%`,
    [market.price_change_percentage_24h]
  )

  const { ref, height, width } = useComponentSize()
  const sparkline = market?.sparkline_in_7d.price ?? []

  return (
    <Link href={`/market/${market.id}`} className="
      MarketCard p-4 flex flex-col aspect-square rounded-2xl shadow-2xl
      hover:shadow-md gap-2 transform transition duration-150 hover:scale-95
      " style={{flexBasis: '275px'}}
    >
      <div className="flex gap-4">

        <div className="flex flex-col justify-between">
          <img className="aspect-square w-12" src={market.image} alt={market.name}/>
          <span style={{color: chartColor}}>{pricePct}</span>
        </div>

        <div className="flex flex-2 flex-col gap-[0.2rem]">
          <div className="text-xl font-bold line-clamp-1">{market.name}</div>
          <div>cap {marketCap}</div>
          <div>vol {volume}</div>
        </div>
      </div>

      <div ref={ref} style={{flex: 2}}>
        <Chart chartData={sparkline}
          color={chartColor}
          width={width}
          height={height}
        />
      </div>

      <div className="flex justify-center text-xl font-bold">
        <span style={{color: chartColor}}>{up ? '▲ ' : '▼ '}</span>
        <NumericFormat
          displayType="text"
          value={market.current_price}
          thousandsGroupStyle="lakh"
          thousandSeparator=","
          prefix={'$'}
          decimalScale={2} // TODO: Handle price 0.0000123
          renderText={(value) => <span>{value}</span>}
        />
      </div>
    </Link>
  )
})
