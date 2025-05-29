import { ThemedText } from '@/components'
import CustomHeader from '@/components/ThemedHeader/ThemedHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

const PosseStackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (x) => {
                    const title = x.options.title || x.route.name
                    return (
                        <CustomHeader
                            title={title}
                            showBack={title !== 'Home'}
                            rightComponent={
                                <Pressable onPress={() => console.log('Settings')}>
                                    <ThemedText.Text>Settings</ThemedText.Text>
                                </Pressable>
                            }
                        />
                    )
                },
            }}
            initialRouteName="index">
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="posseCharacters" options={{ title: 'Posse' }} />
        </Stack>
    )
}

export default PosseStackLayout

const styles = StyleSheet.create({})
