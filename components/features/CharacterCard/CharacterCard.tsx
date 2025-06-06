import { HealthBarContainer } from '@/components'
import ThemedContainer from '@/components/ThemedContainer'
import { BodyPart } from '@/models/bodyParttemplate'
import { PlayerCharacter } from '@/models/playerCharacter'
import { SpecialRule } from '@/models/specialRuleTemplate'
import { SetHealthForBodyPart, SetSpecialRuleUsage, SetWeaponForCharacter } from '@/models/stateChange/posseSlice'
import { Weapon } from '@/models/weapon'
import { setCurrentAmmoForWeapon, setCurrentHealthToBodyPart, setSpecialRuleUsage } from '@/state/posse/posseSlice'
import { AppDispatch } from '@/state/store'
import { useTheme } from '@/theme/ThemeProvider'
import { borderRadius, borderWidth } from '@/theme/constants'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import SpecialRulesContainer from '../SpecialRulesSection/SpecialRulesContainer'
import WeaponContainer from '../Weapons/WeaponContainer'
import CardHeading from './Heading'

type CharacterCardProps = {
    playerCharacter: PlayerCharacter
}
const CharacterCard = ({ playerCharacter }: CharacterCardProps) => {
    const { currentTheme } = useTheme()

    // update player character

    const dispatch = useDispatch<AppDispatch>()

    const handleSpecialRulesChange = (specialRule: SpecialRule) => {
        dispatch(
            setSpecialRuleUsage({
                specialRule: specialRule,
                characterId: playerCharacter.playerCharacterId,
            } as SetSpecialRuleUsage)
        )
    }
    const handleWeaponAmmoChange = useCallback(
        (weapon: Weapon) => {
            console.log('🚀 ~ handleWeaponAmmoChange ~ playerCharacter:', playerCharacter.currentWeapons)
            dispatch(
                setCurrentAmmoForWeapon({
                    weapon: weapon,
                    characterId: playerCharacter.playerCharacterId,
                } as SetWeaponForCharacter)
            )
        },
        [playerCharacter.currentWeapons]
    )

    const handleHealthChange = (bodyPart: BodyPart) => {
        dispatch(
            setCurrentHealthToBodyPart({
                bodyPart: bodyPart,
                characterId: playerCharacter.playerCharacterId,
            } as SetHealthForBodyPart)
        )
    }

    return (
        <ThemedContainer
            style={{
                borderWidth: borderWidth + 1,
                borderRadius: borderRadius / 2,
                overflow: 'hidden',
            }}>
            {/* Heading */}
            <CardHeading playerCharacter={playerCharacter} />
            <View
                style={{
                    backgroundColor: currentTheme.colors.background,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <SpecialRulesContainer
                    specialRules={playerCharacter.specialRules}
                    onSpecialRulesUsageChange={handleSpecialRulesChange}
                />
                {playerCharacter.currentWeapons?.map((item, index) => (
                    <WeaponContainer weapon={item} onAmmoChange={handleWeaponAmmoChange} />
                ))}
                <HealthBarContainer bodyParts={playerCharacter.bodyParts} onHealthChange={handleHealthChange} />
            </View>
        </ThemedContainer>
    )
}

export default CharacterCard

const styles = StyleSheet.create({})
