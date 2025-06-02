import { ThemedText } from '@/components'
import { PlayerCharacter } from '@/models/playerCharacter'
import { useTheme } from '@/theme/ThemeProvider'
import { padding } from '@/theme/constants'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { HealthStatus } from './CharacterCard'

type CharacterCardDetailsSimplifiedProps = {
    playerCharacter: PlayerCharacter
    healthStatus: HealthStatus
}
const CharacterCardDetailsSimplified = ({ playerCharacter, healthStatus }: CharacterCardDetailsSimplifiedProps) => {
    const { currentTheme } = useTheme()
    const _healthStatus = useMemo(() => {
        const incapacitated = playerCharacter.bodyParts.filter((x) => x.currentDamage >= x.maxHealth)
        if (healthStatus.status == 'Healthy') {
            return (
                <ThemedText.Text
                    style={{ color: currentTheme.colors.success, textTransform: 'uppercase' }}
                    type="semibold">
                    Healthy
                </ThemedText.Text>
            )
        }
        if (healthStatus.status == 'Incapacitated') {
            return <ThemedText.Text style={{ color: currentTheme.colors.success }}>Healthy</ThemedText.Text>
        }
        if (healthStatus.status == 'Wounded') {
            return (
                <ThemedText.Text style={{ color: currentTheme.colors.error }} type="semibold">
                    {healthStatus.relevantBodyParts.map((x) => x.name).join(' wounds, ')} wounds
                    {/* {wounded.map((x) => {
						  let returnValue = ''
						  returnValue = returnValue + x.name + ' '
						  return returnValue
					 })} */}
                </ThemedText.Text>
            )
        }
    }, [playerCharacter.bodyParts])

    return (
        <View style={{ flex: 1, width: '100%', padding: padding }}>
            <View style={{ flexDirection: 'row' }}>
                {playerCharacter.specialRules.map((x, index) => {
                    return (
                        <ThemedText.Heading headingSize="h3">
                            {x.name} {playerCharacter.specialRules.length != index + 1 && ' / '}
                        </ThemedText.Heading>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'column' }}>
                {playerCharacter.currentWeapons?.map((x, index) => {
                    return (
                        <ThemedText.Text>
                            {x.name} - {x.currentAmmunition}/{x.maxAmmunition}
                        </ThemedText.Text>
                    )
                })}
            </View>
            <View style={{ flexDirection: 'row' }}>{_healthStatus}</View>
        </View>
    )
}

export default CharacterCardDetailsSimplified

const styles = StyleSheet.create({})
