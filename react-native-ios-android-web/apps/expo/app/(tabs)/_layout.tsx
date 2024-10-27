import React from 'react';
import { Tabs } from 'expo-router';
import { Home, TrendingUp, Star } from '@tamagui/lucide-icons'

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Coins',
          tabBarIcon: ({ color, focused }) => <Home color={color}/>,
        }}
      />
      <Tabs.Screen
        name="favorite/index"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color, focused }) => <Star color={color}/>,
        }}
      />
      <Tabs.Screen
        name="trending/index"
        options={{
          title: 'Trending',
          tabBarIcon: ({ color, focused }) => <TrendingUp color={color}/>,
        }}
      />
    </Tabs>
  )
}