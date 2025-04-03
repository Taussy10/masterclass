import { Text, View } from 'react-native'
import React from 'react'
import { Slot , Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs
    screenOptions={{
        headerShown:false,
        
    }}
    >
        <Tabs.Screen name='index' />
        <Tabs.Screen name='my-content' />
        <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default TabsLayout