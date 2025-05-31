import { ThemedBottomSheet, ThemedText } from '@/components'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import CustomTextInput from '@/components/ThemedTextInput/ThemedTextInput'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'

type PosseCreatorHomeProps = {
    openCreatePosse: boolean
    onCloseCreatePosse: () => void
    onCreatePosse: () => void
}
const PosseCreatorHome = ({ openCreatePosse, onCloseCreatePosse, onCreatePosse }: PosseCreatorHomeProps) => {
    console.log('🚀 ~ PosseCreatorHome ~ openCreatePosse:', openCreatePosse)
    const [name, setName] = useState('')
    return (
        <ThemedBottomSheet
            visible={openCreatePosse}
            onClose={onCloseCreatePosse}
            allowCloseButton
            snapPoints={['40%']}
            headerTitle={'Create New Posse'}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <ThemedText.Heading headingSize="h1">Create Posse</ThemedText.Heading>
                </View>
                <KeyboardAvoidingView>
                    <ThemedText.Text>Name</ThemedText.Text>

                    <CustomTextInput value={name} onChangeText={setName} />
                </KeyboardAvoidingView>
                <View>
                    <ThemedButton title={'Create'} onPress={onCreatePosse} size={'lg'} />
                </View>
            </View>
        </ThemedBottomSheet>
    )
}

export default PosseCreatorHome

const styles = StyleSheet.create({})
