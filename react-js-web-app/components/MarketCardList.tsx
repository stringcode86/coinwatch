import { Market } from '@/data/coinGeckoClient/types'
import { MarketCard } from '@/components/MarketCard'

export type MarketListProps = {
  markets: Market[]
}

export function MarketCardList({markets} : MarketListProps) {

  return (
    <div className="
      MarketCardList relative flex w-full gap-x-4 gap-y-8 justify-evenly flex-wrap py-6
    ">
      {markets.map(
        (market) => <MarketCard key={market.id} market={market}/>
      )}
    </div>
  )
}