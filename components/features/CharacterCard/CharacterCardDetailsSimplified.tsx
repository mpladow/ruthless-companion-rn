import { ThemedText } from '@/components'
import Bullet from '@/components/Icons/Bullet'
import { PlayerCharacter } from '@/models/playerCharacter'
import { useTheme } from '@/theme/ThemeProvider'
import { borderRadius, padding } from '@/theme/constants'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Foundation from '@expo/vector-icons/Foundation'
import Color from 'color'
import React, { Fragment, useMemo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { HealthStatus } from './CharacterCard'

type CharacterCardDetailsSimplifiedProps = {
    playerCharacter: PlayerCharacter
    healthStatus: HealthStatus
}
const CharacterCardDetailsSimplified = ({ playerCharacter, healthStatus }: CharacterCardDetailsSimplifiedProps) => {
    const { currentTheme } = useTheme()
    const _healthStatus = useMemo(() => {
        if (healthStatus.status == 'Healthy') {
            return (
                //  <ThemedText.Text
                //      style={{ color: currentTheme.colors.success, textTransform: 'uppercase' }}
                //      type="semibold">
                //      Healthy
                //  </ThemedText.Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <FontAwesome6 name="heart-pulse" size={20} color={currentTheme.colors.success} />

                    <ThemedText.Text
                        style={{ color: currentTheme.colors.success, textTransform: 'uppercase' }}
                        type="semibold">
                        Healthy
                    </ThemedText.Text>
                </View>
            )
        }
        if (healthStatus.status == 'Incapacitated') {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                        width: Dimensions.get('window').width - 40,
                    }}>
                    <Foundation name="skull" size={24} color={'red'} />
                    <ThemedText.Text style={{ color: 'red', textTransform: 'uppercase' }} type="semibold">
                        Incapacitated
                    </ThemedText.Text>
                </View>
            )
        }
        if (healthStatus.status == 'Wounded') {
            return (
                //   <ThemedText.Text style={{ color: currentTheme.colors.error }} type="semibold">
                //       {healthStatus.relevantBodyParts.map((x) => x.name).join(' wounds, ')} wounds
                //   </ThemedText.Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: 4,
                        width: Dimensions.get('window').width - 50,
                    }}>
                    <FontAwesome name="plus" size={20} color={currentTheme.colors.error} />

                    <ThemedText.Text style={{ color: currentTheme.colors.error }} type="semibold">
                        {healthStatus.relevantBodyParts.map((x) => x.name).join(' wounds, ')} wounds
                    </ThemedText.Text>
                </View>
            )
        }
    }, [playerCharacter.bodyParts])

    return (
        <View
            style={{
                flexGrow: 1,
                width: '100%',
                padding: padding,
            }}>
            {playerCharacter.specialRules.length > 0 && (
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: Color(currentTheme.colors.grey1).lighten(0.2).hex(),
                        padding: padding,
                    }}>
                    {playerCharacter.specialRules.map((x, index) => {
                        return (
                            <ThemedText.Heading headingSize="h3">
                                {x.name} {playerCharacter.specialRules.length != index + 1 && ' / '}
                            </ThemedText.Heading>
                        )
                    })}
                </View>
            )}
            <View style={{ flexDirection: 'column', padding: padding }}>
                {playerCharacter.currentWeapons?.map((x, index) => {
                    return (
                        <Fragment key={index}>
                            <ThemedText.Text>
                                <ThemedText.Text type="bold">{x.name}</ThemedText.Text>
                                {x.specialRules.length > 0 && ' - ' + x.specialRules.map((y) => y.name).join(', ')}
                            </ThemedText.Text>
                            <ThemedText.Text>
                                {x.shortRange}" / {x.longRange}"
                            </ThemedText.Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    paddingVertical: padding,
                                }}>
                                {[...Array(x.currentAmmunition)].map((_, index) => (
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
                                {[...Array(x.maxAmmunition - x.currentAmmunition)].map((_, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: borderRadius / 2,
                                            width: 20,
                                            height: 20,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <FontAwesome name="times" size={16} color={currentTheme.colors.greyOutline} />
                                    </View>
                                ))}
                            </View>
                        </Fragment>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row', padding: padding }}>{_healthStatus}</View>
        </View>
    )
}

export default CharacterCardDetailsSimplified

const styles = StyleSheet.create({})
