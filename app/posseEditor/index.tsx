import { ThemedText } from '@/components'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import CustomTextInput from '@/components/ThemedTextInput/ThemedTextInput'
import { createPosse } from '@/state/posse/userPossesSlice'
import { AppDispatch } from '@/state/store'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

type FormErrorType = { field: string; error: string }
const Index = () => {
    const [name, setName] = useState('')
    const [formError, setFormError] = useState<FormErrorType>()
    const dispatch = useDispatch<AppDispatch>()

    const handleCreatePosse = () => {
        let isValid = validateForm()
        if (isValid) {
            dispatch(createPosse({ name }))
            // navigate to the new posse screen is all is bueno
        }
    }

    const validateForm = useCallback(() => {
        let isValid = false
        let error: FormErrorType = {
            field: '',
            error: '',
        }
        // name error handling
        error.field = 'Name'
        if (name !== '') {
            error.error = 'Name must not be empty'
            return false
        }
        if (name.length > 20) {
            error.error = 'Name must be less than 20 characters'
            return false
        }
        if (!isValid) {
            setFormError(error)
        } else {
            setFormError(undefined)
        }

        return isValid
    }, [name])

    const onChangeText = (val: string) => {
        setName(val)
    }

    return (
        <>
            <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
                <View style={{ flex: 1 }}>
                    <KeyboardAvoidingView>
                        <ThemedText.Heading headingSize="h2">Name</ThemedText.Heading>

                        <CustomTextInput value={name} onChangeText={onChangeText} />
                    </KeyboardAvoidingView>
                    <View>
                        <ThemedButton title={'Create'} onPress={handleCreatePosse} size={'lg'} />
                    </View>
                </View>
            </PageContainer>
        </>
    )
}

export default Index

const styles = StyleSheet.create({})
