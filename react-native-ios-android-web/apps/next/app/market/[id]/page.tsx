'use client'

import { MarketDetailScreen } from 'app/features/market/market-detail-screen'
import { useParams } from 'solito/navigation'

export default function Page() {
  const { id } = useParams()
  return <MarketDetailScreen id={id as string} />
}
