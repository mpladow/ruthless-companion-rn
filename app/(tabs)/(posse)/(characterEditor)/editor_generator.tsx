import { ThemedText } from '@/components'
import ThemedContainer from '@/components/ThemedContainer'
import React from 'react'
import { StyleSheet } from 'react-native'

const Generator = () => {
    return (
        <ThemedContainer>
            <ThemedText.Text>Create from Scratch</ThemedText.Text>
            <ThemedText.Text>OR</ThemedText.Text>
            <ThemedText.Text>Create from Scratch</ThemedText.Text>
            <ThemedText.Text>Add information</ThemedText.Text>
        </ThemedContainer>
    )
}

export default Generator

const styles = StyleSheet.create({})
