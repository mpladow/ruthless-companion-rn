import ModalHeader from '@/components/ThemedHeader/ModalHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const PosseEditorLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                header: (x) => {
                    const title = x.options.title || x.route.name
                    return (
                        <ModalHeader
                            title={title}
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
            <Stack.Screen name="index" options={{ title: 'CreatePosse' }} />
        </Stack>
    )
}

export default PosseEditorLayout

const styles = StyleSheet.create({})
