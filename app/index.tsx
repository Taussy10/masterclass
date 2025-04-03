import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'



const Index = () => {
  const auth = useAuth()
  // if (auth.isSignedIn) {
  //   <Redirect href={"/login"} />
    
  // }
  return (
    <SafeAreaView className='  bg-green-500 flex-1'>
      <Redirect href={"/profile"} />
      {/* <Redirect href={"/login"} /> */}
      <Text>Index</Text>
    </SafeAreaView>
  )
}

export default Index
