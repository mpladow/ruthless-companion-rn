import { ThemedText } from '@/components'
import Messagebox from '@/components/Messagebox/Messagebox'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import CustomTextInput from '@/components/ThemedTextInput/ThemedTextInput'
import { Posse } from '@/models/posse'
import { setCurrentPosse } from '@/state/posse/posseSlice'
import { createPosse, updatePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin } from '@/theme/constants'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

type FormErrorType = { field: string; error: string }
const PosseName = () => {
    const { id } = useLocalSearchParams()
    const [posseId, setPosseId] = useState(0)
    const [posseUpdated, setPosseUpdated] = useState(false)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState<FormErrorType>()

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const navigation = useNavigation()
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : []
    })
    useLayoutEffect(() => {
        navigation.setOptions({
            title: posseId > 0 ? 'Edit Posse' : 'Create Posse',
        })
    }, [navigation, posseId])

    useEffect(() => {
        if (id !== null && Number(id) > 0) {
            setPosseId(Number(id))
            const posseFound = posses.find((x) => x.posseId == id)
            if (posseFound) {
                setName(posseFound?.name)
            }
        } else {
            dispatch(setCurrentPosse(undefined))
        }
    }, [id])

    useEffect(() => {
        if (posseUpdated) {
            setPosseUpdated(false)
            if (posseId) {
                const posseFound = posses.find((x) => x.posseId == id)
                if (posseFound) {
                    dispatch(setCurrentPosse(posseFound))
                    router.replace(`../${posseFound.posseId}`)
                }
            } else {
                const posseFound = posses[posses.length - 1]
                dispatch(setCurrentPosse(posseFound))
                router.replace(`../${posseFound.posseId}`)
            }
        }
    }, [posses])

    const handleCreatePosse = () => {
        let isValid = validateForm()
        if (isValid) {
            setLoading(true)
            if (posseId) {
                // edit
                const posseFound = posses.find((x) => x.posseId == id)
                if (posseFound) {
                    const updated = { ...posseFound, name: name } as Posse
                    setPosseUpdated(true)
                    dispatch(updatePosse(updated))
                    //   setTimeout(() => {
                    //       setLoading(false)
                    //       dispatch(setCurrentPosse(posseFound))
                    //       router.replace(`../${posseFound.posseId}`)
                    //   }, 1000)
                }
            } else {
                // create
                setPosseUpdated(true)
                dispatch(createPosse({ name } as Posse))
                //  setTimeout(() => {
                //      setLoading(false)
                //      dispatch(setCurrentPosse(posses[posses.length - 1]))
                //      router.replace(`../${posses[posses.length - 1].posseId}`)
                //  }, 1000)
            }
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
                            <ThemedButton
                                title={posseId ? 'Save Changes' : 'Create New Posse'}
                                onPress={handleCreatePosse}
                                size={'lg'}
                            />
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
