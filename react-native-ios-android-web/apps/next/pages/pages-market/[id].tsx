import { MarketDetailScreen } from 'app/features/market/market-detail-screen'
import Head from 'next/head'
import { createParam } from 'solito'

const { useParam } = createParam<{ id: string }>()

export default function Page() {
  const [id] = useParam('id') as unknown as string
  return (
    <>
      <Head>
        <title>{id}</title>
      </Head>
      <MarketDetailScreen id={id} />
    </>
  )
}
