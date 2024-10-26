import { FavoriteScreen } from 'app/features/favorite/favorite-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Favorite',
          presentation: 'card',
          animation: 'simple_push',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <FavoriteScreen/>
    </>
  )
}
