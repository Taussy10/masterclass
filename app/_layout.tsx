import '../global.css';
import { ClerkProvider ,ClerkLoaded , useAuth } from '@clerk/clerk-expo'
import { router, Stack, useSegments } from 'expo-router';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ActivityIndicator, LogBox, useColorScheme } from 'react-native';
// import { tokenCache } from '~/utils/cache';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StrapiProvider } from '~/providers/strapi-provider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

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


// Returns a list of selected file segments for the currently selected
//  route. Segments are not normalized, so they will be 
// the same as the file path. 
// For example, /[id]?id=normal becomes ["[id]"].
SplashScreen.preventAutoHideAsync();
const IntialLayout = () => {
  const segments = useSegments()
  useReactQueryDevTools(queryClient)
  const {isLoaded, isSignedIn} = useAuth()

  const [loaded, error] = useFonts({
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
      
    }
    // const inAuthGroup = segments[1] === '(auth)';
    // if (isSignedIn && !inAuthGroup) {
    //   router.replace("/(app)/(auth)/(tabs)/index")
      
    // }
    // isLoaded for loading the auth in clerk
  }, [loaded, error, isLoaded,isSignedIn]);




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
      <Stack.Screen name='login'  />
      <Stack.Screen name='test'  />
    </Stack> 
  )
}


const RootLayout = () => {
  const colorScheme = useColorScheme()
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{flex:1}} >
          <QueryClientProvider client={queryClient}>
            <StrapiProvider>
              <ThemeProvider value={colorScheme === "dark"? DarkTheme: DefaultTheme}>
          <IntialLayout />
              </ThemeProvider>
            </StrapiProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  )
}


export default RootLayout