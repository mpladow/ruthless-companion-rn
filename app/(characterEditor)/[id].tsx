import { ThemedText } from '@/components'
import ButtonLarge from '@/components/features/CharacterEditor/ButtonLarge'
import PageContainer from '@/components/PageContainer/PageContainer'
import { AppDispatch } from '@/state/store'
import { margin } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

const CharacterEditor = () => {
    const { currentTheme } = useTheme()
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleAddPresetPress = () => {
        router.navigate('/preselectedCharacters')
    }
    const handleAddCustomPress = () => {
        router.navigate('/editor')
    }
    return (
        <>
            <View
                style={{
                    height: 200,
                    backgroundColor: currentTheme.colors.textDefault,
                    position: 'relative',
                }}>
                <Image
                    source={require('../../assets/images/cowboy-m-rev.png')}
                    style={{
                        filter: 'invert(1)',
                        height: 400,
                        width: 500,
                        position: 'absolute',
                        bottom: -250,
                        left: 0,
                        opacity: 0.2,
                        tintColor: 'white',
                    }}
                />
            </View>
            <PageContainer paddingSize="sm" fullScreenWidth={'50%'}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ButtonLarge
                        onPress={() => handleAddPresetPress()}
                        title={'Preset'}
                        color={currentTheme.colors.primary}
                        invertText
                        subtitle="Select a premade character with preselected weapons and traits"></ButtonLarge>
                    <View style={{ paddingVertical: margin }}>
                        <ThemedText.Text type="semibold">OR</ThemedText.Text>
                    </View>
                    <ButtonLarge
                        onPress={() => handleAddCustomPress()}
                        color={currentTheme.colors.background}
                        title={'Custom'}
                        subtitle="Select weapons and traits to create a custom character"></ButtonLarge>
                </View>
            </PageContainer>
        </>
    )
}

export default CharacterEditor

const styles = StyleSheet.create({})
