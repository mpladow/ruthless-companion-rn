import ModalHeader from '@/components/ThemedHeader/ModalHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const CharacterEditorStack = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
               //  gestureEnabled: false,
                header: (x) => {
                    const title = x.options.title || x.route.name
                    return (
                        <ModalHeader
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
            <Stack.Screen name="[id]" options={{ title: 'Add Posse Member' }} />
            <Stack.Screen name="editor" options={{ title: 'Create Custom Character' }} />
            <Stack.Screen
                name="preselectedCharacters"
                options={{ title: 'Select a character' }}
            />
        </Stack>
    )
}

export default CharacterEditorStack

const styles = StyleSheet.create({})
