import { HealthBarContainer } from '@/components'
import AnimatedAccordion from '@/components/Animated/AnimatedAccordion'
import ExpandedIndicator from '@/components/Animated/ExpandedIndicator'
import ThemedContainer from '@/components/ThemedContainer'
import { BodyPart } from '@/models/bodyParttemplate'
import { PlayerCharacter } from '@/models/playerCharacter'
import { SpecialRule } from '@/models/specialRuleTemplate'
import { SetHealthForBodyPart, SetSpecialRuleUsage, SetWeaponForCharacter } from '@/models/stateChange/posseSlice'
import { Weapon } from '@/models/weapon'
import { setCurrentAmmoForWeapon, setCurrentHealthToBodyPart, setSpecialRuleUsage } from '@/state/posse/posseSlice'
import { AppDispatch } from '@/state/store'
import { useTheme } from '@/theme/ThemeProvider'
import { borderRadius, borderWidth, padding } from '@/theme/constants'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import SpecialRulesContainer from '../SpecialRulesSection/SpecialRulesContainer'
import WeaponContainer from '../Weapons/WeaponContainer'
import CharacterCardDetailsSimplified from './CharacterCardDetailsSimplified'
import CardHeading from './Heading'

type CharacterCardProps = {
    playerCharacter: PlayerCharacter
}
export type HealthStatus = { status: string; relevantBodyParts: BodyPart[] }

const CharacterCard = ({ playerCharacter }: CharacterCardProps) => {
    const { currentTheme } = useTheme()
    const [collapsed, setCollapsed] = useState(false)

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
    const isExpanded = useSharedValue(false)
    useEffect(() => {
        isExpanded.value = !isExpanded.value
    }, [collapsed])

    const handleExpandToggle = () => {
        setCollapsed((old) => !old)
    }

    const healthStatus = useMemo(() => {
        const healthStatus: HealthStatus = {
            status: 'Healthy',
            relevantBodyParts: [],
        }
        const incapacitated = playerCharacter.bodyParts.filter((x) => x.currentDamage >= x.maxHealth)
        if (incapacitated.length > 0) {
            healthStatus.status = 'Incapacitated'
            return healthStatus
        }
        const fullHealth = playerCharacter.bodyParts.every((x) => x.currentDamage == 0)
        if (fullHealth) {
            healthStatus.status = 'Healthy'
            return healthStatus
        }

        const wounded = playerCharacter.bodyParts.filter((x) => x.currentDamage > 0)
        if (wounded.length > 0) {
            healthStatus.status = 'Wounded'
            healthStatus.relevantBodyParts = wounded
            return healthStatus
        }
        return healthStatus
    }, [playerCharacter.bodyParts])

    return (
        <ThemedContainer
            style={{
                borderWidth: borderWidth + 1,
                borderRadius: borderRadius / 2,
                overflow: 'hidden',
            }}>
            {/* Heading */}
            <CardHeading playerCharacter={playerCharacter} onPress={handleExpandToggle} />
            <View
                style={{
                    backgroundColor: currentTheme.colors.background,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <AnimatedAccordion viewKey="playerCharacter.weapon" isExpanded={isExpanded} invertExpanded>
                    <CharacterCardDetailsSimplified healthStatus={healthStatus} playerCharacter={playerCharacter} />
                </AnimatedAccordion>
                <AnimatedAccordion viewKey="playerCharacter.weapon" isExpanded={isExpanded}>
                    {playerCharacter.specialRules.length > 0 && (
                        <SpecialRulesContainer
                            specialRules={playerCharacter.specialRules}
                            onSpecialRulesUsageChange={handleSpecialRulesChange}
                        />
                    )}
                    {playerCharacter.currentWeapons?.map((item, index) => (
                        <WeaponContainer weapon={item} onAmmoChange={handleWeaponAmmoChange} />
                    ))}

                    <HealthBarContainer bodyParts={playerCharacter.bodyParts} onHealthChange={handleHealthChange} />
                </AnimatedAccordion>
            </View>
            <TouchableWithoutFeedback onPress={handleExpandToggle}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: padding }}>
                    <ExpandedIndicator isExpanded={!collapsed} onPress={handleExpandToggle} />
                </View>
            </TouchableWithoutFeedback>
        </ThemedContainer>
    )
}

export default CharacterCard

const styles = StyleSheet.create({})
