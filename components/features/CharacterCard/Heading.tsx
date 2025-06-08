import { ThemedText } from '@/components'
import { useTheme } from '@/theme/ThemeProvider'
import { borderWidth, padding } from '@/theme/constants'
import React, { PropsWithChildren } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const CardHeading = ({
    name,
    toughness,
    onPress,
    children,
}: {
    name?: string
    toughness?: number
    onPress?: () => void
    children?: PropsWithChildren['children']
}) => {
    const { currentTheme } = useTheme()
    return (
        <Pressable
            onPress={() => {
                console.log('🚀 ~ CardHeading ~ onPress:', name)
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
                    <View>
                        <ThemedText.Heading headingSize="h2" inverted>
                            {name}
                        </ThemedText.Heading>
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
