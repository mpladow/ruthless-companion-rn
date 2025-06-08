import { ThemedText } from '@/components'
import ButtonLarge from '@/components/features/CharacterEditor/ButtonLarge'
import PageContainer from '@/components/PageContainer/PageContainer'
import { AppDispatch } from '@/state/store'
import { margin } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

const CharacterEditor = () => {
    const { currentTheme } = useTheme()
    const { id } = useLocalSearchParams()
    console.log('🚀 ~ navigationCheck CharacterEditor ~ id:', id)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleAddPresetPress = () => {
        router.navigate('/preselectedCharacters')
    }
    const handleAddCustomPress = () => {
        router.navigate('/editor')
    }
    return (
        <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ButtonLarge
                    onPress={() => handleAddPresetPress()}
                    title={'Preset'}
                    color={currentTheme.colors.primary}
                    invertText
                    subtitle="Select a premade character with preselected weapons and traits"></ButtonLarge>
                <View style={{ paddingVertical: margin }}>
                    <ThemedText.Text type="semibold">Or</ThemedText.Text>
                </View>
                <ButtonLarge
                    onPress={() => handleAddCustomPress()}
                    color={currentTheme.colors.background}
                    title={'Custom'}
                    subtitle="Select weapons and traits to create a custom character"></ButtonLarge>
            </View>
        </PageContainer>
    )
}

export default CharacterEditor

const styles = StyleSheet.create({})
