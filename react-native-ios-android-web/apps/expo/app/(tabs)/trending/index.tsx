import { TrendingScreen } from 'app/features/trending/trending-screen'
import { Stack, Tabs, usePathname } from 'expo-router'
import {Star, StarFull, TrendingUp} from "@tamagui/lucide-icons";
import React from "react";

export default function Screen() {

  const path = usePathname()

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
