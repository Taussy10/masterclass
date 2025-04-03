import { Alert, Image,  Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState , useEffect } from 'react';
import { useSSO } from '@clerk/clerk-expo';
import { useStrapi } from '~/providers/strapi-provider';
import { randomUUID } from 'expo-crypto';
import { Redirect , useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'


export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()



const Login = () => {
  useWarmUpBrowser()
//  intial loading will be true cause user hasn't signed in 
  const [loading, setLoading] = useState(true);
const router = useRouter()
  // Got a useSSO hook fromclek
  const { startSSOFlow } = useSSO();

  // Got the createuser function useStrapi hook(just a custom hook) 
  const { createUser } = useStrapi();


  const handleSignIn = async (strategy: 'string') => {
    try {
      // an ID is create for registering in multiple services 
      // signup object is for data of that person signed up 
      // sign in data for those user has signed in(it can be use for protect route )

      // why strategy in curly ? cause we want to breaek it and why await ? cause it return promise so have to 
      const { createdSessionId, setActive, signUp , signIn } = await startSSOFlow({ strategy });

      if (!createdSessionId) {
           throw new Error("Error aa reha hai bhai ")
      }


      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }

      // //  Strapi
      // // for variables created for holding 
      // const email = signUp?.emailAddress;
      // const username = signUp?.username;
      // const password = randomUUID();
      // const id = signUp?.createdUserId;

      // if (!email || !username || !password || !id) {
      //   throw new Error('Missing requried fields');
      // }


      // const strapiUser = {
      //   email,
      //   username,
      //   password,
      //   clerkId: id,
      // };
      // const user = await createUser(strapiUser);
      // console.log("StrapiUser credentials :" ,strapiUser);


      // console.log('SignedIn user :', user);
      if (signIn) {
        router.push('/test'); // Use router.push if using expo-router
      }
      

    } catch (error) {
      // console.log('error :',error);
      // throw new Error('Error while trying to sign-in ');
      console.log(error);
      Alert.alert("Sign-in Failed", "Something went wrong")
      
    }
  };

  return (
    <SafeAreaView className=" flex-1 items-center bg-dark  px-4">
      <StatusBar style="light" backgroundColor={'red'}  />

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
      // why in arrow functin ? cause we want to provide params in it
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
