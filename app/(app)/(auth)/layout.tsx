import {  Text, useColorScheme, View } from 'react-native'
import {useEffect} from 'react'
import { Redirect, Slot, useRouter, useSegments , Tabs, Stack} from 'expo-router'
import { useAuth  } from '@clerk/clerk-expo'

// here all the screens that comes for logged in user will come 
const AuthLayout = () => {
 const colorScheme = useColorScheme()
 
  return (

    <Stack
      screenOptions={{
        headerTintColor: '#0d6c9a',
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#fff' : '#000',
        },
      }}>
    <Stack.Screen name='(tabs)' />
    <Stack.Screen name='courses' />
   </Stack>
  )
}

export default AuthLayout
