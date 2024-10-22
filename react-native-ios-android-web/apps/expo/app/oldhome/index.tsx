import { OldHomeScreen } from 'app/features/oldhome/old-screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Old Home',
          presentation: 'card',
          animation: 'simple_push',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <OldHomeScreen/>
    </>
  )
}
