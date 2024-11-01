'use client'

import {useParams, useSearchParams} from 'next/navigation'
import { useMarket } from '@/app/market/[id]/hooks'
import { useFavorites } from '@/app/favorite/hooks'
import Nav from '@/components/Nav'

export default function Market() {
  const { id } = useParams<{ id: string }>()
  const { market, marketQuery } = useMarket(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <main>
      <Nav title={market?.name ?? 'Market'}/>
      <h1>{market?.name} {isFavorite(id).toString()}</h1>
    </main>
  )
}