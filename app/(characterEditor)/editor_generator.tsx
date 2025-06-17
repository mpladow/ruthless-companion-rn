import { ThemedText } from '@/components'
import { GenderType } from '@/components/features/GenderSwitcher/GenderSwitcher'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import {
	FIRST_NAMES_FEMALE,
	FIRST_NAMES_MALE,
	LAST_NAMES,
	LAWFUL_TITLES,
	NEUTRAL_TITLES,
	UNLAWFUL_TITLES,
} from '@/data/names'
import { SPEC_RULES } from '@/data/special_rules'
import { getRandomNumber } from '@/helpers/helpers'
import { AlignmentType, SpecialityType, TraitType } from '@/models/specialRuleTemplate'
import { margin } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { SlideInLeft, SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CharacterEditorForm } from './editor'

type EditorGeneratorProps = {
    onSubmit: (character: CharacterEditorForm) => void
    /** Determines animation style */
    initialLoad?: boolean
    onCancelPress: () => void
    quality: TraitType
    speciality?: SpecialityType
    alignment: AlignmentType
    gender: GenderType
    notoriety: 'low' | 'medium' | 'high'
    setQualityChange: (trait: TraitType) => void
    setSpecialityChange: (speciality: SpecialityType | undefined) => void
    setAlignmentChange: (alignment: AlignmentType) => void
    setGenderChange: (gender: GenderType) => void
    setNotorietyChange: (notoriety: 'low' | 'medium' | 'high') => void
}
const EditorGenerator = ({
    onSubmit,
    onCancelPress,
    initialLoad,
    quality,
    speciality,
    alignment,
    gender,
    notoriety,
    setQualityChange,
    setSpecialityChange,
    setAlignmentChange,
    setGenderChange,
    setNotorietyChange,
}: EditorGeneratorProps) => {
    const genders: GenderType[] = ['male', 'female']
    const alignmentList: AlignmentType[] = ['bandit', 'neutral', 'lawman']
    const traitsList: TraitType[] = ['greenhorn', 'regular', 'veteran']
    const specialityList: SpecialityType[] = ['brave', 'cowardly', 'melee', 'ranged', 'stealthy', 'tough']
    const specialRules = SPEC_RULES.filter((x) => !x.weaponRule).sort((a, b) => a.name.localeCompare(b.name))
    const { currentTheme } = useTheme()
    const { bottom } = useSafeAreaInsets()

    const handleGenerate = () => {
        const character: CharacterEditorForm = {
            name: 'bobby',
            gender: 'male',
            toughness: 3,
            selectedWeaponIndex1: 0,
            selectedWeaponIndex2: 0,
            startingWeapons: [],
            bodyParts: [],
            specialRules: [],
            title: '',
        }
        const toughness = getToughnessFromTrait(quality as TraitType)
        character.toughness = Math.floor(toughness)
        character.gender = gender
        character.specialRules = generateTraits()
        // generate name
        character.name = generateNameFromGender()
        character.title = generateTitleFromAlignment()
        onSubmit(character)
    }

    const generateTraits = () => {
        const traits = getTraits()
        const randomSpecialRule = getRandomObject(traits)
        let traitArray = [randomSpecialRule]
        if (randomSpecialRule.points < 0) {
            const anotherSpecialRule = getRandomObject(
                traits.filter((x) => x.points > 0 && x.specialRuleId !== randomSpecialRule.specialRuleId)
            )
            if (anotherSpecialRule) {
                traitArray.push(anotherSpecialRule)
            }
        }
        return traitArray
    }

    const generateNameFromGender = () => {
        let firstName = gender == 'female' ? getRandomObject(FIRST_NAMES_FEMALE) : getRandomObject(FIRST_NAMES_MALE)
        let lastName = getRandomObject(LAST_NAMES)
        return `${firstName} ${lastName}`
    }
    const generateTitleFromAlignment = () => {
        if (notoriety == 'high') {
            if (alignment === 'bandit') {
                return getRandomObject(UNLAWFUL_TITLES)
            } else if (alignment === 'lawman') {
                return getRandomObject(LAWFUL_TITLES)
            } else {
                return getRandomObject(NEUTRAL_TITLES)
            }
        } else {
            return ''
        }
    }
    function getRandomObject(array: any[]) {
        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex]
    }

    const getToughnessFromTrait = (trait: TraitType) => {
        switch (trait) {
            case 'veteran':
                return getRandomNumber(2, 5)
            case 'greenhorn':
                return getRandomNumber(6, 9)

            case 'regular':
                return getRandomNumber(4, 7)

            default:
                return 5
        }
    }

    const getTraits = () => {
        const validRulesFilteredByQuality = specialRules.filter((rule) =>
            quality !== 'regular' ? rule.specialityType.includes(quality) : true
        )
        const validRulesFilteredByAlignment = validRulesFilteredByQuality.filter(
            (rule) =>
                rule.alignmentType.includes(alignment as AlignmentType) ||
                rule.alignmentType.includes('neutral' as AlignmentType)
        )
        // include personality traits
        const validRulesFilteredBySpeciality =
            speciality !== undefined
                ? validRulesFilteredByAlignment.filter(
                      (rule) =>
                          rule.specialityType.includes(speciality as SpecialityType) ||
                          rule.specialityType.includes('personality' as SpecialityType)
                  )
                : validRulesFilteredByAlignment.filter((rule) =>
                      rule.specialityType.includes('personality' as SpecialityType)
                  )
        const rulesForCharacter = [...validRulesFilteredByAlignment]
        const unique = [...new Set(rulesForCharacter)]
        return unique
    }

    return (
        <>
            <Animated.ScrollView
                entering={
                    Platform.OS !== 'web'
                        ? initialLoad == true
                            ? SlideInRight.delay(100)
                            : SlideInLeft.delay(100)
                        : undefined
                }
                exiting={Platform.OS !== 'web' ? SlideOutRight : undefined}>
                <ThemedContainer style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ flexGrow: 1 }}>
                        <View style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText.Text type="bold">Select Gender</ThemedText.Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    marginTop: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                {genders.map((x) => (
                                    <ThemedButton
                                        key={x}
                                        title={x.charAt(0).toUpperCase() + x.slice(1)}
                                        onPress={() => {
                                            setGenderChange(x as GenderType)
                                        }}
                                        type={'primary'}
                                        variant={gender === x ? 'filled' : 'ghost'}
                                        size={'sm'}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText.Text type="bold">How skilled is your character?</ThemedText.Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    marginTop: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                {traitsList.map((x) => (
                                    <ThemedButton
                                        key={x}
                                        title={x.charAt(0).toUpperCase() + x.slice(1)}
                                        onPress={() => {
                                            setQualityChange(x as TraitType)
                                        }}
                                        type={'primary'}
                                        variant={quality === x ? 'filled' : 'ghost'}
                                        size={'sm'}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText.Text type="bold">Does your character have an alignment?</ThemedText.Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    marginTop: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                {alignmentList.map((x) => (
                                    <ThemedButton
                                        key={x}
                                        title={x.charAt(0).toUpperCase() + x.slice(1)}
                                        onPress={() => {
                                            setAlignmentChange(x as AlignmentType)
                                        }}
                                        type={'primary'}
                                        variant={alignment === x ? 'filled' : 'ghost'}
                                        size={'sm'}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText.Text type="bold">
                                Does your character have any special perks (whether good or bad)?
                            </ThemedText.Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    marginTop: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                {specialityList.map((x) => (
                                    <ThemedButton
                                        key={x}
                                        title={x.charAt(0).toUpperCase() + x.slice(1)}
                                        onPress={() => {
                                            if (x === speciality) {
                                                setSpecialityChange(undefined)
                                            } else {
                                                setSpecialityChange(x as SpecialityType)
                                            }
                                        }}
                                        type={'primary'}
                                        variant={speciality === x ? 'filled' : 'ghost'}
                                        size={'sm'}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={{ marginTop: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText.Text type="bold">Is your character well known?</ThemedText.Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 6,
                                    marginTop: 12,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                <ThemedButton
                                    title={'Unknown'}
                                    onPress={() => {
                                        setNotorietyChange('low')
                                    }}
                                    type={'primary'}
                                    variant={notoriety === 'low' ? 'filled' : 'ghost'}
                                    size={'sm'}
                                />
                                <ThemedButton
                                    title={'Well Known'}
                                    onPress={() => {
                                        setNotorietyChange('high')
                                    }}
                                    type={'primary'}
                                    variant={notoriety === 'high' ? 'filled' : 'ghost'}
                                    size={'sm'}
                                />
                            </View>
                        </View>
                    </View>
                    {/* // this will generate the special rules, name, and toughness */}
                </ThemedContainer>
            </Animated.ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 6,
                    marginBottom: bottom,
                    marginTop: margin,
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}>
                <View>
                    <ThemedButton title={'<'} onPress={onCancelPress} size={'lg'} type="primary" variant="ghost" />
                </View>
                <View style={{ flex: 2 }}>
                    <ThemedButton onPress={handleGenerate} title={'Generate >'} size={'lg'} variant="ghost">
                        Generate
                    </ThemedButton>
                </View>
            </View>
        </>
    )
}

export default EditorGenerator

const styles = StyleSheet.create({})
