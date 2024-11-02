'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useMarket } from '@/app/market/[id]/hooks'
import { useFavorites } from '@/app/favorite/hooks'
import { useEffect, useMemo, useState } from 'react'
import { useComponentSize } from '@/utils/useComponentSize'
import { TailSpin } from 'react-loader-spinner'
import Nav from '@/components/Nav'
import Chart from '@/components/Chart'


export default function Market() {
  const { id } = useParams<{ id: string }>()
  const { market, marketQuery } = useMarket(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  const { ref, height, width } = useComponentSize()
  const sparkline = market?.sparkline_in_7d.price ?? []

  return (
    <main>
      <Nav title={market?.name ?? 'Market'}/>
      <h1>{market?.name} {isFavorite(id).toString()}</h1>
      <div ref={ref} width="300px" height="200px" style={{width: '300px', height: '200px', backgroundColor: 'grey'}}>
        { sparkline.length > 0
          ? <Chart chartData={sparkline} width={width} height={height}/>
          : null }
      </div>
      <TailSpin visible={marketQuery.isFetching} color="black" wrapperClass="w-12 m-auto"/>
    </main>
  )
}


