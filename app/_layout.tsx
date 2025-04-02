import '../global.css';
import { ClerkProvider ,ClerkLoaded , useAuth } from '@clerk/clerk-expo'
import { Stack } from 'expo-router';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ActivityIndicator, LogBox } from 'react-native';
// import { tokenCache } from '~/utils/cache';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StrapiProvider } from '~/providers/strapi-provider';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set Pubhlishable key")
}

// For ignoring all logs
LogBox.ignoreLogs(["Clekr: Clerk has been loaded with dev keys"])


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 60*60*1000
    }
  }
})


SplashScreen.preventAutoHideAsync();
const IntialLayout = () => {
  useReactQueryDevTools(queryClient)
  const {isLoaded, isSignedIn} = useAuth()

  const [loaded, error] = useFonts({
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    // isLoaded for loading the auth in clerk
  }, [loaded, error, isLoaded]);




  // If not loaded or error then keep rolling activity indicator 
  if (!loaded && !error) {
    return <ActivityIndicator size={"large"}   />
  }



  return(
    <Stack 
    screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen name='index'  />
    </Stack> 
  )
}


const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{flex:1}} >
          <QueryClientProvider client={queryClient}>
            <StrapiProvider>
          <IntialLayout />
            </StrapiProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  )
}


export default RootLayout