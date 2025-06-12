import AnimatedAccordion from '@/components/Animated/AnimatedAccordion'
import ThemedContainer from '@/components/ThemedContainer'
import commonStyles from '@/constants/styles'
import { BodyPart } from '@/models/bodyParttemplate'
import { PlayerCharacter } from '@/models/playerCharacter'
import { SpecialRule } from '@/models/specialRuleTemplate'
import { SetSpecialRuleUsage, SetWeaponForCharacter } from '@/models/stateChange/posseSlice'
import { Weapon } from '@/models/weapon'
import { setCurrentAmmoForWeapon, setSpecialRuleUsage } from '@/state/posse/posseSlice'
import { AppDispatch } from '@/state/store'
import { useTheme } from '@/theme/ThemeProvider'
import { borderRadius, borderWidth } from '@/theme/constants'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import SpecialRulesContainer from '../SpecialRulesSection/SpecialRulesContainer'
import WeaponContainer from '../Weapons/WeaponContainer'
import CharacterCardDetailsSimplifiedRO from './CharacterCardDetailsSimplifiedRO'
import CardHeading from './Heading'

//TODO:  move out of this screen
export type HealthStatus = { status: string; relevantBodyParts: BodyPart[] }

type CharacterCardReadOnlyProps = {
    playerCharacter: PlayerCharacter
    collapsedView: boolean
    readOnly?: boolean
}

const CharacterCardReadOnly = ({ playerCharacter, collapsedView }: CharacterCardReadOnlyProps) => {
    const { currentTheme } = useTheme()
    const [collapsed, setCollapsed] = useState(collapsedView)

    // update player character
    useEffect(() => {
        setCollapsed(collapsedView)
    }, [collapsedView])

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
            dispatch(
                setCurrentAmmoForWeapon({
                    weapon: weapon,
                    characterId: playerCharacter.playerCharacterId,
                } as SetWeaponForCharacter)
            )
        },
        [playerCharacter.currentWeapons]
    )

    const isExpanded = useSharedValue(false)
    useEffect(() => {
        isExpanded.value = !collapsed
    }, [collapsed])

    return (
        <ThemedContainer
            style={[
                {
                    borderWidth: borderWidth + 1,
                    borderRadius: borderRadius / 2,
                    overflow: 'hidden',
                },
                commonStyles.boxShadow,
            ]}>
            {/* Heading */}
            <CardHeading
                name={playerCharacter.name}
                toughness={playerCharacter.toughness}
                onPress={() => {}}
                gender={playerCharacter.gender}
            />
            <View
                style={{
                    backgroundColor: currentTheme.colors.background,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <AnimatedAccordion viewKey="playerCharacter.weapon" isExpanded={isExpanded} invertExpanded>
                    <CharacterCardDetailsSimplifiedRO playerCharacter={playerCharacter} />
                </AnimatedAccordion>
                <AnimatedAccordion viewKey="playerCharacter.weapon" isExpanded={isExpanded}>
                    {playerCharacter.specialRules.length > 0 && (
                        <SpecialRulesContainer
                            key={playerCharacter.playerCharacterId}
                            specialRules={playerCharacter.specialRules}
                            onSpecialRulesUsageChange={handleSpecialRulesChange}
                        />
                    )}
                    {playerCharacter.startingWeapons?.map((item, index) => (
                        <WeaponContainer
                            key={index + item.weaponId}
                            readOnly={true}
                            weapon={item}
                            onAmmoChange={handleWeaponAmmoChange}
                        />
                    ))}
                </AnimatedAccordion>
            </View>
        </ThemedContainer>
    )
}

export default CharacterCardReadOnly

const styles = StyleSheet.create({})
