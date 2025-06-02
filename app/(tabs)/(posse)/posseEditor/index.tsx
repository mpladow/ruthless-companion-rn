import { ThemedText } from '@/components'
import Messagebox from '@/components/Messagebox/Messagebox'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import CustomTextInput from '@/components/ThemedTextInput/ThemedTextInput'
import { setCurrentPosse } from '@/state/posse/posseSlice'
import { createPosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin } from '@/theme/constants'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

type FormErrorType = { field: string; error: string }
const PosseName = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState<FormErrorType>()
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : []
    })
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const handleCreatePosse = () => {
        let isValid = validateForm()
        if (isValid) {
            setLoading(true)
            dispatch(createPosse({ name }))
            setTimeout(() => {
                setLoading(false)
                dispatch(setCurrentPosse(posses[posses.length - 1]))
                router.replace('/(tabs)/(posse)/posseCharacters')
            }, 500)
            // navigate to the new posse screen is all is bueno
        }
    }

    const validateForm = useCallback(() => {
        let isValid = true
        let error: FormErrorType = {
            field: '',
            error: '',
        }
        // name error handling
        error.field = 'Name'
        if (name == '') {
            error.error = 'Name must not be empty'
            setFormError(error)

            return false
        }
        if (name.length > 20) {
            error.error = 'Name must be less than 20 characters'
            setFormError(error)

            return false
        }
        if (isValid) {
            setFormError(undefined)
        }
        console.log('🚀 ~ validateForm ~ isValid:', isValid)

        return isValid
    }, [name])

    const onChangeText = (val: string) => {
        setName(val)
    }

    return (
        <>
            <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            flexGrow: 1,
                            height: '100%',
                        }}>
                        <KeyboardAvoidingView behavior="padding" style={{ marginTop: margin * 5 }}>
                            {formError && (
                                <Messagebox type={'error'} viewStyle={{ marginVertical: margin }}>
                                    <ThemedText.Text inverted>{formError.error}</ThemedText.Text>
                                </Messagebox>
                            )}
                            <ThemedText.Heading headingSize="h1">Name</ThemedText.Heading>

                            <CustomTextInput value={name} onChangeText={onChangeText} />
                        </KeyboardAvoidingView>
                        <View style={{ marginBottom: margin * 5 }}>
                            <ThemedButton title={'Create'} onPress={handleCreatePosse} size={'lg'} />
                        </View>
                    </View>
                </ScrollView>
            </PageContainer>
            {/* <CustomModal visible={loading} onClose={() => {}} children={<View>Loading...</View>} /> */}
        </>
    )
}

export default PosseName

const styles = StyleSheet.create({})
