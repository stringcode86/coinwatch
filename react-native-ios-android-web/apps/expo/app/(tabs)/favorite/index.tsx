import { FavoriteScreen } from 'app/features/favorite/favorite-screen'
import { Stack, Tabs } from 'expo-router'
import { Star, StarFull } from "@tamagui/lucide-icons";
import React from "react";

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
