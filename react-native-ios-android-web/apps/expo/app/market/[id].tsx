import { MarketDetailScreen } from 'app/features/market/market-detail-screen'
import { Stack } from 'expo-router'
import { useParams } from 'solito/navigation'

export default function Screen() {
  const { id } = useParams()
  return (
    <>
      <Stack.Screen
        options={{
          title: `Detail`,
          presentation: 'card',
          animation: 'simple_push',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <MarketDetailScreen id={id as string} />
    </>
  )
}
