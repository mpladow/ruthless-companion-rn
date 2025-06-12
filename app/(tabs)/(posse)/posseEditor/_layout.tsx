import ModalHeader from '@/components/ThemedHeader/ModalHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const PosseEditorLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: (x) => {
                    const title = x.options.title || x.route.name
                    return (
                        <ModalHeader
                            showBack
                            blurBackground
                            title={title}
                            //  rightComponent={
                            //      <Pressable onPress={() => console.log('Settings')}>
                            //          <ThemedText.Text>Settings</ThemedText.Text>
                            //      </Pressable>
                            //  }
                        />
                    )
                },
            }}>
            <Stack.Screen name="index" options={{ title: 'Create Posse' }} />
            <Stack.Screen name="[id]" options={{ title: 'Edit Posse' }} />
        </Stack>
    )
}

export default PosseEditorLayout

const styles = StyleSheet.create({})
