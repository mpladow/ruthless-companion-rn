import Bullet from '@/components/Icons/Bullet'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { ThemedText } from '@/components/ThemedText/ThemedText'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type ReloadButtonProps = {
    handleReloadPress: () => void
    maxAmmunition: number
}
const ReloadButton = ({ handleReloadPress, maxAmmunition }: ReloadButtonProps) => {
    const { currentTheme } = useTheme()
    const BUTTON_SIZE = 20
    return (
        <ThemedButton
            onLongPress={handleReloadPress}
            title={
                <View
                    style={{
                        position: 'relative',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Feather name="refresh-cw" size={BUTTON_SIZE} color={currentTheme.colors.textInverted} />
                    <View
                        style={{
                            paddingHorizontal: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 4,
                        }}>
                        <ThemedText.Text size="default" inverted type="bold">
                            {maxAmmunition < 3 ? maxAmmunition : '3'}
                        </ThemedText.Text>
                    </View>
                    <View style={{ height: BUTTON_SIZE, width: BUTTON_SIZE }}>
                        <Bullet fill={currentTheme.colors.textInverted} />
                    </View>
                </View>
            }
            onPress={handleReloadPress}
            size={'sm'}
            style={{ paddingVertical: padding, paddingHorizontal: padding * 2 }}
        />
    )
}

export default ReloadButton

const styles = StyleSheet.create({})
