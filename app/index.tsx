import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'
const Index = () => {
  return (
    <SafeAreaView className='  bg-green-500 flex-1'>
      <Redirect href={"/login"} />
      <Text>Index</Text>
    </SafeAreaView>
  )
}

export default Index
