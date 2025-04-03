import {  Text, View } from 'react-native'
import {useEffect} from 'react'
import { Redirect, Slot, useRouter, useSegments } from 'expo-router'
import { useAuth  } from '@clerk/clerk-expo'


const AppLayout = () => {
    const {isSignedIn} = useAuth()
    const router =  useRouter()
    const segments =  useSegments()
    const inAuthGroup = segments[1] === '(auth)';

    // if user is not signed then redirect to login 
    // if (isSignedIn && inAuthGroup) {
    //    return <Redirect href={"/login"} /> 
    // }
    // if (!isSignedIn && inAuthGroup) {
    //    return <Redirect href={"/login"} /> 
    // }
    // else move to next layout
  return (

   <Slot />
  )
}

export default AppLayout
