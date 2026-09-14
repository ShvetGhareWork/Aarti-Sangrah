import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  NotoSerifDevanagari_400Regular,
  NotoSerifDevanagari_700Bold,
} from '@expo-google-fonts/noto-serif-devanagari';
import * as SplashScreen from 'expo-splash-screen';
import { useSettingsStore } from '../src/store';
import { lightColors, darkColors } from '../src/theme/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const themeMode = useSettingsStore((state) => state.themeMode);
  const isDark = themeMode === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    NotoSerifDevanagari_400Regular,
    NotoSerifDevanagari_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'NotoSerifDevanagari_700Bold',
            fontSize: 20,
          },
          headerBackTitle: '',
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="deity/[id]"
          options={{
            title: 'आरती संग्रह',
          }}
        />
        <Stack.Screen
          name="aarti/[id]"
          options={{
            title: 'आरती',
          }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: 'आरती शोधा',
          }}
        />
        <Stack.Screen
          name="recents"
          options={{
            title: 'अलीकडे पाहिलेले',
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'ॲप बद्दल',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
