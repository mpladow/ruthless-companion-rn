import { ThemedText } from '@/components'
import GenderIcon from '@/components/GenderIcons/GenderIcon'
import { useTheme } from '@/theme/ThemeProvider'
import { borderWidth, padding } from '@/theme/constants'
import React, { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { GenderType } from '../GenderSwitcher/GenderSwitcher'

const CardHeading = ({
    name,
    toughness,
    gender,
    onPress,
    children,
}: {
    name?: string
    toughness?: number
    gender?: GenderType
    onPress?: () => void
    children?: PropsWithChildren['children']
}) => {
    const { currentTheme } = useTheme()
    return (
        <Pressable
            onPress={() => {
                onPress?.()
            }}
            style={[
                styles.cardHeadingContainer,
                {
                    backgroundColor: currentTheme.colors.primary,
                },
            ]}>
            {children ? (
                children
            ) : (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ThemedText.Heading headingSize="h2" inverted>
                            {name}
                        </ThemedText.Heading>
                        <GenderIcon value={gender ?? 'male'} invertColor style={{ paddingLeft: padding }} />
                    </View>
                    <View>
                        <ThemedText.Heading headingSize="h2" inverted>
                            {toughness}
                        </ThemedText.Heading>
                    </View>
                </>
            )}
        </Pressable>
    )
}

export default CardHeading

const styles = StyleSheet.create({
    cardHeadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: padding * 2,
        borderBottomWidth: borderWidth + 1,
    },
})
