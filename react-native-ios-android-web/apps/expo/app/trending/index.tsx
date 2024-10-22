import { TrendingScreen } from 'app/features/trending/trending-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Trending',
          presentation: 'card',
          animation: 'simple_push',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <TrendingScreen/>
    </>
  )
}
