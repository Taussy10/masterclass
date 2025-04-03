import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { useSSO } from '@clerk/clerk-expo';
import { useStrapi } from '~/providers/strapi-provider';
import { randomUUID } from 'expo-crypto';

const Login = () => {
  const [loading, setLoadisdfdsfsddfng] = useState(true);
  const { startSSOFlow } = useSSO();
  const { createUser } = useStrapi();

  const handleSignIn = async (strategy: 'oauth_google') => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({ strategy });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }

      //   Strapi

      const email = signUp?.emailAddress;
      const username = signUp?.username;
      const password = randomUUID();
      const id = signUp?.createdUserId;

      if (!email || !username || !password || !id) {
        throw new Error('Missing requried fields');
      }

      const strapiUser = {
        email,
        username,
        password,
        clerkId: id,
      };
      const user = await createUser(strapiUser);
      console.log('SignedIn user :', user);
    } catch (error) {
      console.log('error');
      throw new Error('Error while trying to sign-in ');
    }
  };

  return (
    <SafeAreaView className=" flex-1 items-center bg-dark  px-4">
      <StatusBar style="light" backgroundColor={'brown'}  />

      <Image
        source={require('../assets/intro.png')}
        // className='  size-96 mb-52'
        style={{
          width: '100%',
          height: 400,
          aspectRatio: 1,
          marginBottom: 100,
        }}
        resizeMode="contain"
      />

      <Text className=" mb-5   text-3xl font-bold  text-white ">Your Journey starts here</Text>

      <TouchableOpacity
      onPress={() => handleSignIn('oauth_google')}
        activeOpacity={0.7}
        className=" w-full flex-row items-center justify-center gap-2 rounded-xl  bg-white p-3 ">
        <AntDesign name="google" size={24} color="black" />
        <Text className="  text-base   font-semibold">Continue with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
