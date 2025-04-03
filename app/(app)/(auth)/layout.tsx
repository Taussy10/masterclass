import {  Text, View } from 'react-native'
import {useEffect} from 'react'
import { Redirect, Slot, useRouter, useSegments , Tabs, Stack} from 'expo-router'
import { useAuth  } from '@clerk/clerk-expo'

// here all the screens that comes for logged in user will come 
const AuthLayout = () => {
  return (

   <Stack
   screenOptions={{
    headerShown:false,

   }}
   >
    <Stack.Screen name='courses' />
    <Stack.Screen name='(tabs)' />
   </Stack>
  )
}

export default AuthLayout
