import { Market } from '@/data/coinGeckoClient/types'
import { MarketCard } from '@/components/MarketCard'

export type MarketListProps = {
  markets: Market[]
}

export function MarketCardList({markets} : MarketListProps) {

  return (
    <div className="MarketCardList">
      {markets.map(
        (market) => <MarketCard key={market.id} market={market}/>
      )}
    </div>
  )
}