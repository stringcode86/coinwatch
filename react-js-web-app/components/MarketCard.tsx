import { Market } from '@/data/coinGeckoClient/types'
import { memo } from 'react'

export type MarketCardProps = {
  market: Market,
  onPress?: () => void
}

export const MarketCard = memo(({market, onPress }: MarketCardProps) => {

  return (
    <div className="MarketCard">
      <h1 color="white">{market.name}</h1>
    </div>
  )
})