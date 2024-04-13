import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
// Import your global CSS file
import AuthProvider from "@/providers/AuthProvider";
import { View, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      // router.push("/(tabs)/");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <View className="bg-white dark:bg-black w-full h-full flex-1">
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                navigationBarColor: colorScheme === "dark" ? "black" : "white",
                headerStyle: {
                  backgroundColor: colorScheme === "dark" ? "black" : "white",
                },
                headerTintColor: colorScheme === "dark" ? "white" : "black",
                contentStyle: {
                  backgroundColor: colorScheme === "dark" ? "black" : "white",
                },
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                options={{ headerShown: false }}
                name="onboarding"
              />
              <Stack.Screen options={{}} name="sign-in" />
              <Stack.Screen options={{}} name="sign-up" />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </View>
    // </ThemeProvider>
  );
}
