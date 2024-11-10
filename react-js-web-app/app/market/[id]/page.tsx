'use client'

import { Market } from '@/data/coinGeckoClient/types'
import { useParams } from 'next/navigation'
import { useMarket } from '@/app/market/[id]/hooks'
import { useFavorites } from '@/app/favorite/hooks'
import { useComponentSize } from '@/utils/useComponentSize'
import { Star } from 'lucide-react'
import Divider from '@/components/Divider'
import Nav from '@/components/Nav'
import Chart from '@/components/Chart'
import Button from "@/components/Button";
import {abbreviateNumber} from "@/utils/abbreviateNumber";
import {NumericFormat} from "react-number-format";
import Spinner from '@/components/Spinner'

export default function Market() {
  const { id } = useParams<{ id: string }>()
  const { market, marketQuery } = useMarket(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <>
      <Nav title={market?.name ?? 'Market'}/>
      <main className="p-8">
        { market
          ? <div className="flex flex-col max-w-[860px] m-auto gap-8">
            <Header
              market={market}
              isFavorite={isFavorite(id)}
              toggleFavorite={()=>toggleFavorite(id)}
            />
            <Divider/>
            <div className="flex flex-col gap-8 md:flex-row md:gap-4">
              <ChartSection market={market}/>
              <Divider className="block md:hidden"/>
              <Details market={market}/>
            </div>
          </div>
          : null }
        <Spinner visible={marketQuery.isFetching} />
      </main>
    </>
  )
}

function Header({market, isFavorite, toggleFavorite}: {
  market: Market,
  isFavorite: boolean,
  toggleFavorite: ()=>void,
}) {
  return (
    <div className="flex flex-row items-start width-full gap-4">
      <img className="aspect-square flex-0 max-h-[135px]" src={market.image} alt={market.name}/>
      <div className="flex flex-col flex-1">
        <h1 className="text-8xl font-bold">{market.name}</h1>
        <div className="flex flex-row place-content-between align-middle">
          <h2 className="text-4xl font-bold">{market.symbol}</h2>
          <Button onClick={toggleFavorite}>
            <Star fill={ isFavorite ? "var(--foreground)" : "none" }/>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChartSection({market}: { market: Market }) {
  const { ref, height, width } = useComponentSize()
  const sparkline = market?.sparkline_in_7d.price ?? []
  const up = (market?.price_change_percentage_24h ?? 1) > 0

  return (
    <div className="w-full md:w-1/2 flex-2 aspect-square" ref={ref}>
      <Chart
        chartData={sparkline}
        color={`var(--tint-${up ? 'up' : 'down'})`}
        width={width}
        height={height}
      />
    </div>
  )
}

function Details({market}: { market: Market }) {
  const volume = abbreviateNumber(market.market_cap ?? 0)
  const currSupply = abbreviateNumber(market.circulating_supply ?? 0)
  const maxSupply = abbreviateNumber(market.max_supply ?? 0)
  const pctChange = (market.price_change_percentage_24h ?? 0).toFixed(2)
  const up = (market?.price_change_percentage_24h ?? 1) > 0

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-row">
        <span className="w-1/3">Price</span>
        <NumericFormat
          displayType="text"
          value={market.current_price}
          thousandsGroupStyle="lakh"
          thousandSeparator=","
          prefix={'$'}
          decimalScale={2} // TODO: Handle price 0.0000123
          renderText={(value) => <span className="w-1/3">{value}</span>}
        />
        <span className={`w-1/3 text-tint${up ? 'Up' : 'Down'}`}>{pctChange}%</span>
      </div>

      <div className="flex flex-row">
        <span className="w-1/3">Volume</span>
        <span className="w-1/3">{volume}</span>
        <span className="w-1/3">{market.market_cap_rank}</span>
      </div>

      <div className="flex flex-row">
        <span className="w-1/3">Supply</span>
        <span className="w-1/3">{currSupply}</span>
        <span className="w-1/3">{maxSupply}</span>
      </div>
    </div>
  )
}

