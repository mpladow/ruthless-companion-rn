import { ThemedText } from '@/components'
import { PlayerCharacter } from '@/models/playerCharacter'
import { useTheme } from '@/theme/ThemeProvider'
import { borderWidth, padding } from '@/theme/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const CardHeading = ({ playerCharacter }: { playerCharacter: PlayerCharacter }) => {
    const { currentTheme } = useTheme()
    return (
        <View
            style={{
                backgroundColor: currentTheme.colors.primary,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: padding * 2,
                borderBottomWidth: borderWidth + 1,
            }}>
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
        </View>
    )
}

export default CardHeading

const styles = StyleSheet.create({})
