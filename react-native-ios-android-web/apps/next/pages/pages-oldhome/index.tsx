import { OldHomeScreen } from 'app/features/oldhome/old-screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Old home screen</title>
      </Head>
      <OldHomeScreen pagesMode={true}/>
    </>
  )
}
