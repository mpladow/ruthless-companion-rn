import { ThemedText } from '@/components'
import { PlayerCharacter } from '@/models/playerCharacter'
import { useTheme } from '@/theme/ThemeProvider'
import { margin, padding } from '@/theme/constants'
import Color from 'color'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type CharacterCardDetailsSimplifiedProps = {
    playerCharacter: PlayerCharacter
}
const CharacterCardDetailsSimplified = ({ playerCharacter }: CharacterCardDetailsSimplifiedProps) => {
    const { currentTheme } = useTheme()

    return (
        <View style={{ flex: 1, width: '100%', padding: padding }}>
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: Color(currentTheme.colors.grey1).lighten(0.2).hex(),
                }}>
                {playerCharacter.specialRules.map((x, index) => {
                    return (
                        <View style={{ flexDirection: 'row', paddingBottom: padding, gap: 8 }}>
                            <View>
                                <ThemedText.Heading headingSize="h3">
                                    {/* {x.name} {playerCharacter.specialRules.length != index + 1 && ' / '} */}
                                    {x.name}
                                </ThemedText.Heading>
                            </View>
                            <View style={{ flex: 1, paddingTop: 1 }}>
                                <ThemedText.Text>{x.description}</ThemedText.Text>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'column', marginTop: margin }}>
                {playerCharacter.currentWeapons?.map((x, index) => {
                    return (
                        <View style={{ marginTop: margin }}>
                            <ThemedText.Heading headingSize="h2">{x.name}</ThemedText.Heading>
                            {x.specialRules.length > 0 && (
                                <View style={{ backgroundColor: currentTheme.colors.grey0 }}>
                                    {x?.specialRules.map((item, index) => (
                                        <View style={{ paddingVertical: 4 }}>
                                            <ThemedText.Text type="semibold">{item.name}</ThemedText.Text>

                                            <ThemedText.Text>{item.description}</ThemedText.Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                            <ThemedText.Text>Ammunition: {x.maxAmmunition}</ThemedText.Text>
                            <ThemedText.Text>
                                {x.shortRange}" / {x.longRange}"
                            </ThemedText.Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default CharacterCardDetailsSimplified

const styles = StyleSheet.create({})
