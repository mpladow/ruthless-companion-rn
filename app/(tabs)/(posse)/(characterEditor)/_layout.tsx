import CustomHeader from '@/components/ThemedHeader/ThemedHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const CharacterEditorStack = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                header: (x) => {
                    const title = x.options.title || x.route.name
                    return (
                        <CustomHeader
                            title={title}
                            showBack={title !== 'Home'}
                            //  rightComponent={
                            //      <Pressable onPress={() => console.log('Settings')}>
                            //          <ThemedText.Text>Settings</ThemedText.Text>
                            //      </Pressable>
                            //  }
                        />
                    )
                },
            }}
            initialRouteName="index">
            <Stack.Screen name="index" options={{ title: 'Add Posse Member' }} />
            <Stack.Screen name="characterEdit" options={{ title: 'Character Editor' }} />
            <Stack.Screen name="preselectedCharacters" options={{ title: 'Select a characteter' }} />
        </Stack>
    )
}

export default CharacterEditorStack

const styles = StyleSheet.create({})
