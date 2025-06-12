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
    title,
    gender,
    onPress,
    children,
}: {
    name?: string
    toughness?: number
    title?: string
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
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
                    </View>
                    {title && (
                        <View>
                            <ThemedText.Heading headingSize="h3" inverted>
                                {title}
                            </ThemedText.Heading>
                        </View>
                    )}
                </View>
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
