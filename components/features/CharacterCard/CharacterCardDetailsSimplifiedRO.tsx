import { ThemedText } from '@/components'
import Bullet from '@/components/Icons/Bullet'
import { PlayerCharacter } from '@/models/playerCharacter'
import { useTheme } from '@/theme/ThemeProvider'
import { borderRadius, margin, padding } from '@/theme/constants'
import Color from 'color'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type CharacterCardDetailsSimplifiedProps = {
    playerCharacter: PlayerCharacter
    showWeaponDetails?: boolean
}
const CharacterCardDetailsSimplified = ({
    playerCharacter,
    showWeaponDetails = true,
}: CharacterCardDetailsSimplifiedProps) => {
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
                        <View key={index + x.name} style={{ flexDirection: 'row', paddingBottom: padding, gap: 8 }}>
                            <View>
                                <ThemedText.Heading headingSize="h3">
                                    {/* {x.name} {playerCharacter.specialRules.length != index + 1 && ' / '} */}
                                    {x.name}
                                </ThemedText.Heading>
                            </View>
                            {showWeaponDetails && (
                                <View style={{ flex: 1, paddingTop: 1 }}>
                                    <ThemedText.Text>{x.description}</ThemedText.Text>
                                </View>
                            )}
                        </View>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'column', marginTop: margin }}>
                {playerCharacter.startingWeapons?.map((x, index) => {
                    return (
                        <View key={index + x.weaponTemplateId.toString()}>
                            <ThemedText.Heading headingSize="h2">{x.name}</ThemedText.Heading>
                            {x.specialRules.length > 0 && (
                                <View style={{ backgroundColor: currentTheme.colors.grey0 }}>
                                    {x?.specialRules.map((item, index) => (
                                        <View style={{ paddingVertical: 4 }}>
                                            <ThemedText.Text type="semibold">{item.name}</ThemedText.Text>

                                            {showWeaponDetails && (
                                                <ThemedText.Text key={index + item.name} type="regular">
                                                    <ThemedText.Text>{item.description}</ThemedText.Text>
                                                </ThemedText.Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            )}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    paddingVertical: padding,
                                }}>
                                {[...Array(x.maxAmmunition)].map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: borderRadius / 2,
                                            width: 20,
                                            height: 20,
                                        }}>
                                        <Bullet fill={currentTheme.colors.warning} />
                                    </View>
                                ))}
                            </View>
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
