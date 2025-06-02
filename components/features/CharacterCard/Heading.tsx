import { ThemedText } from '@/components'
import { PlayerCharacter } from '@/models/playerCharacter'
import { useTheme } from '@/theme/ThemeProvider'
import { borderWidth, padding } from '@/theme/constants'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

const CardHeading = ({ playerCharacter, onPress }: { playerCharacter: PlayerCharacter; onPress: () => void }) => {
    const { currentTheme } = useTheme()
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.cardHeadingContainer,
                {
                    backgroundColor: currentTheme.colors.primary,
                },
            ]}>
            <View>
                <ThemedText.Heading headingSize="h2" inverted>
                    {playerCharacter.name}
                </ThemedText.Heading>
            </View>
            <View>
                <ThemedText.Heading headingSize="h2" inverted>
                    {playerCharacter.toughness}
                </ThemedText.Heading>
            </View>
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
