'use client'

import {useParams, useSearchParams} from 'next/navigation'
import { useMarket } from '@/app/market/[id]/hooks'
import { useFavorites } from '@/app/favorite/hooks'

export default function Market() {
  const { id } = useParams<{ id: string }>()
  const { market, marketQuery } = useMarket(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <>
      <h1>{market?.name} {isFavorite(id).toString()}</h1>
    </>
  )
}