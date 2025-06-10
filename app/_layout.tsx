import { persistor, store } from '@/state/store'
import { gptDarkTheme, gptLightTheme } from '@/theme/presetThemes/gptHeme'
import ThemeProvider from '@/theme/ThemeProvider'
import { fontConfig } from '@/theme/types/type'
import {
	CourierPrime_400Regular,
	CourierPrime_400Regular_Italic,
	CourierPrime_700Bold,
	CourierPrime_700Bold_Italic,
} from '@expo-google-fonts/courier-prime'
import { Rye_400Regular } from '@expo-google-fonts/rye'
import { Smokum_400Regular } from '@expo-google-fonts/smokum'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

export default function RootLayout() {
    const [loaded] = useFonts({
        CourierPrime_400Regular,
        CourierPrime_400Regular_Italic,
        CourierPrime_700Bold,
		  CourierPrime_700Bold_Italic,
        Rye_400Regular,
        Smokum_400Regular,
    })

    if (!loaded) {
        // Async font loading only occurs in development.
        return null
    }
    const fontConfigPrimary: fontConfig = {
        type: 'primary',
        family: 'Courier',
        regular: {
            fontFamily: 'CourierPrime_400Regular',
        },
        regularItalic: {
            fontFamily: 'CourierPrime_400Regular_Italic',
        },
        medium: {
            fontFamily: 'CourierPrime_700Bold',
        },
        mediumItalic: {
            fontFamily: 'CourierPrime_700Bold_Italic',
        },
        bold: {
            fontFamily: 'CourierPrime_700Bold',
        },
        boldItalic: {
            fontFamily: 'CourierPrime_700Bold_Italic',
        },
    }
    const fontConfigHeading: fontConfig = {
        type: 'heading',
        family: 'Rye',
        regular: {
            fontFamily: 'Rye_400Regular',
        },
        regularItalic: {
            fontFamily: 'Rye_400Regular',
        },
        medium: {
            fontFamily: 'Rye_400Regular',
        },
        mediumItalic: {
            fontFamily: 'Rye_400Regular',
        },
        bold: {
            fontFamily: 'Rye_400Regular',
        },
        boldItalic: {
            fontFamily: 'Rye_400Regular',
        },
    }
    const fontConfig2Heading: fontConfig = {
        type: 'heading',
        family: 'Smokum',
        regular: {
            fontFamily: 'Smokum_400Regular',
        },
        regularItalic: {
            fontFamily: 'Smokum_400Regular',
        },
        medium: {
            fontFamily: 'Smokum_400Regular',
        },
        mediumItalic: {
            fontFamily: 'Smokum_400Regular',
        },
        bold: {
            fontFamily: 'Smokum_400Regular',
        },
        boldItalic: {
            fontFamily: 'Smokum_400Regular',
        },
    }
    return (
        <GestureHandlerRootView style={styles.container}>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <ThemeProvider
                        defaultTheme={{
                            themeConfigs: [gptDarkTheme, gptLightTheme],
                            fonts: [fontConfigPrimary, fontConfigHeading, fontConfig2Heading],
                        }}>
                        <BottomSheetModalProvider>
                            <SafeAreaProvider>
                                <MenuProvider>
                                    <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
                                        <Stack.Screen
                                            name="(tabs)"
                                            options={{
                                                headerShown: false,
                                            }}
                                        />
                                        <Stack.Screen name="+not-found" />
                                    </Stack>

                                    <StatusBar style="dark" translucent={true} backgroundColor="rgba(0,0,0,0.5)" />
                                </MenuProvider>
                            </SafeAreaProvider>
                        </BottomSheetModalProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
    },
})
