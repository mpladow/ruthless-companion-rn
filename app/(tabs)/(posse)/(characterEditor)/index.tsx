import { ThemedText } from '@/components'
import ButtonLarge from '@/components/features/CharacterEditor/ButtonLarge'
import PageContainer from '@/components/PageContainer/PageContainer'
import { margin } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const CharacterEditor = () => {
    const { currentTheme } = useTheme()
    const router = useRouter()
    const handleAddPresetPress = () => {
        router.navigate('/preselectedCharacters')
    }
    const handleAddCustomPress = () => {}
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
                    onPress={() => handleAddPresetPress()}
                    color={currentTheme.colors.background}
                    title={'Custom'}
                    subtitle="Select weapons and traits to create a custom character"></ButtonLarge>
            </View>
        </PageContainer>
    )
}

export default CharacterEditor

const styles = StyleSheet.create({})
