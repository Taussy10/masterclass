import { Text, View } from 'react-native'
import React from 'react'
import { Slot , Tabs } from 'expo-router'
import Home from '.'
import AntDesign from '@expo/vector-icons/AntDesign';

// tabBarIcon?: ((props: {
    // focused: boolean;
    // color: string;
    // size: number;
// }) => React.ReactNode) | undefined


// thes tabBar returns ReactNode! what's react node ? just jsx make sure your returns it
export const TabsIcons = () => {
    return(
        <AntDesign name="google" size={24} color="blue" />
    )
}

const TabsLayout = () => {
  return (
    <Tabs
    screenOptions={{
        headerShown:false,
    }}>
        <Tabs.Screen name='index'
        options={{
            // If you don't write tabBarLabel then file's name will overwrite on the label 
            tabBarLabel: "Home",
            tabBarIcon: ({focused, color, size }) => <TabsIcons />
        }}
        />
        <Tabs.Screen name='my-content'
         options={{
            tabBarLabel: "My Content",
            tabBarIcon: ({focused, color, size }) => <TabsIcons />
        }}
        
        />
        <Tabs.Screen name='profile'
        
        options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({focused, color, size }) => <TabsIcons />
        }}
        />
    </Tabs>
  )
}

export default TabsLayout