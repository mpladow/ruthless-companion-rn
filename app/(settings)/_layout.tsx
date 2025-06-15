import CustomHeader from '@/components/ThemedHeader/ThemedHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const SettingsStackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (x) => {
                    const title = x.options.title || x.route.name
                    return (
                        <CustomHeader
                            title={title}
                            showBack={true}
                            //  rightComponent={
                            //      <Pressable onPress={() => console.log('Settings')}>
                            //          <ThemedText.Text>Settings</ThemedText.Text>
                            //      </Pressable>
                            //  }
                        />
                    )
                },
            }}>
            <Stack.Screen name="index" options={{ title: 'Settings' }} />
				<Stack.Screen name="editCustomData" options={{ title: 'Custom Data' }} />
        </Stack>
    )
}

export default SettingsStackLayout

const styles = StyleSheet.create({})
