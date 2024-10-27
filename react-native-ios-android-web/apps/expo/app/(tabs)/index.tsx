import { HomeScreen } from 'app/features/home/screen'
import { Stack, Tabs } from 'expo-router'
import { Star, StarFull } from "@tamagui/lucide-icons";
import React from "react";

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Coins',
        }}
      />
      <HomeScreen />
    </>
  )
}
