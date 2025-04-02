import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign';

const Login = () => {
  return (
    <SafeAreaView className=' px-4 bg-dark flex-1  items-center'>
        <StatusBar style="light" backgroundColor={"brown"} translucent={true}  />

<Image source={require("../assets/intro.png")}
// className='  size-96 mb-52'
style={{
    width: "100%",
    height: 400,
    aspectRatio: 1,
    marginBottom: 100,
}}
resizeMode='contain'
/>


      <Text className=' mb-5   text-3xl font-bold  text-white '>Your Journey starts here</Text>

 <TouchableOpacity 
 activeOpacity={0.7}
 className=' w-full bg-white rounded-xl p-3 flex-row gap-2  justify-center items-center '>
 <AntDesign name="google" size={24} color="black" />
 <Text className='  font-semibold   text-base'>Continue with Google</Text>
 </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Login

