import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const EditExistingTemplateLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                //  gestureEnabled: false,
            }}
            initialRouteName="[characterTemplateId]">
            <Stack.Screen name="[characterTemplateId]" options={{ title: 'Edit Character Template' }} />
        </Stack>
    )
}

export default EditExistingTemplateLayout

const styles = StyleSheet.create({})
