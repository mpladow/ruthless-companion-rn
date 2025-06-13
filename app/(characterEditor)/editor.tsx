import { ThemedBottomSheet, ThemedText } from '@/components'
import { GenderType } from '@/components/features/GenderSwitcher/GenderSwitcher'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import { BODY_PARTS } from '@/data/body_parts'
import { SPEC_RULES } from '@/data/special_rules'
import { BodyPart, BodyPartTemplate } from '@/models/bodyParttemplate'
import { CharacterTemplate } from '@/models/characterTemplate'
import { PlayerCharacter } from '@/models/playerCharacter'
import {
	AlignmentType,
	SpecialityType,
	SpecialRule,
	SpecialRuleTemplate,
	TraitType,
} from '@/models/specialRuleTemplate'
import { Weapon, WeaponTemplate } from '@/models/weapon'
import { addCustomCharacter } from '@/state/editor/customCharactersSlice'
import { addCharacterToPosseMembers } from '@/state/posse/posseSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid'
import { useDispatch, useSelector } from 'react-redux'
import EditorForm from './editor_form'
import EditorGenerator from './editor_generator'

export type CharacterEditorForm = {
    name: string
    title: string
    toughness: number
    gender: GenderType
    selectedWeaponIndex1: number
    selectedWeaponIndex2: number
    startingWeapons: Weapon[]
    bodyParts: BodyPart[]
    specialRules: SpecialRule[]
}
const characterEdit = () => {
    const customCharacters = useSelector((state: RootState) => state.customCharacters)
    const selectedPosse = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.selectedPosse : null
    })
    const dispatch = useDispatch<AppDispatch>()
    const [showGeneratorQuestionaire, setShowGeneratorQuestionaire] = useState(true)
    const [loading, setLoading] = useState(false)
    const [characterSubmitted, setCharacterSubmitted] = useState<PlayerCharacter | null>(null)
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const { currentTheme } = useTheme()
    const { bottom } = useSafeAreaInsets()

    const router = useRouter()
    // FORM DATA
    const [quality, setQuality] = useState<TraitType>('regular')
    const [speciality, setSpeciality] = useState<SpecialityType | undefined>()
    const [alignment, setAlignment] = useState<AlignmentType>('neutral')
    const [gender, setGender] = useState<GenderType>('male')
    const [notoriety, setNotoriety] = useState<'low' | 'medium' | 'high'>('low')

    const [initialLoad, setInitialLoad] = useState(true)

    const methods = useForm<CharacterEditorForm>({
        defaultValues: {
            name: 'New Character',
            title: '',
            toughness: 5,
            gender: 'male' as GenderType,
            selectedWeaponIndex1: 0,
            selectedWeaponIndex2: 0,
            startingWeapons: [] as WeaponTemplate[],
            bodyParts: [] as BodyPartTemplate[],
            specialRules: [] as SpecialRuleTemplate[],
        },
    })

    const {
        fields: specialRulesFields,
        append: appendSpecialRule,
        remove: removeSpecialRule,
    } = useFieldArray({
        control: methods.control,
        name: 'specialRules',
    })
    const {
        fields: startingWeaponsFields,
        append: appendStartingWeapon,
        remove: removeStartingWeapon,
    } = useFieldArray({
        control: methods.control,
        name: 'startingWeapons',
    })

    const handleTraitsModal = useCallback(() => {
        setShowBottomSheet(!showBottomSheet)
    }, [])

    const handleConfirmCharacter = (data: CharacterEditorForm) => {
        setLoading(true)
        const newCharacterTemplate: CharacterTemplate = {
            characterTemplateId: uuid.v4(),
            name: data.name,
            toughness: data.toughness,
            gender: data.gender,
            startingWeapons: [],
            bodyParts: [],
            specialRules: data.specialRules,
            isCustom: true,
        }
        console.log('🚀 ~ handleConfirmCharacter ~ newCharacterTemplate:', newCharacterTemplate)
        newCharacterTemplate.bodyParts = BODY_PARTS.map(
            (part) =>
                ({
                    ...part,
                    currentDamage: 0,
                    id: uuid.v4(),
                } as BodyPart)
        )

        let weaponInstance = data.startingWeapons.map((x) => {
            const weapon: Weapon = {
                weaponId: x.weaponId,
                name: x.name,
                image: x.image,
                description: x.description,
                shortRange: x.shortRange,
                longRange: x.longRange,
                maxAmmunition: x.maxAmmunition,
                specialRules: x.specialRules,
                weaponTemplateId: x.weaponTemplateId,
                currentAmmunition: x.maxAmmunition,
            }
            return weapon
        })
        newCharacterTemplate.startingWeapons = weaponInstance
        newCharacterTemplate.currentWeapons = weaponInstance
        console.log('🚀 ~ handleAddToPosse handleConfirmCharacter ~ newCharacterTemplate:', newCharacterTemplate)

        try {
            dispatch(addCustomCharacter(newCharacterTemplate))
        } catch (error) {
            console.log('Error during dispatch', error)
        }

        const newCharacter: PlayerCharacter = {
            name: newCharacterTemplate.name,
            toughness: newCharacterTemplate.toughness,
            gender: newCharacterTemplate.gender,
            startingWeapons: [],
            bodyParts: [],
            specialRules: newCharacterTemplate.specialRules,
            playerCharacterId: uuid.v4(),
            characterTemplateId: newCharacterTemplate.characterTemplateId,
            title: data.title,
            isCustom: true,
            order: (selectedPosse && selectedPosse?.members.length + 1) || 0, // Set order based on current posse members
        }
        console.log('🚀 ~ dsfsdfdsf setTimeout ~ newCharacter:', newCharacter)
        // set initial values
        const updatedWeapons = data.startingWeapons.map((x) => {
            const weapon: Weapon = {
                currentAmmunition: x.maxAmmunition,
                weaponId: x.weaponId,
                name: x.name,
                image: x.image,
                description: x.description,
                shortRange: x.shortRange,
                longRange: x.longRange,
                maxAmmunition: x.maxAmmunition,
                specialRules: x.specialRules,
                weaponTemplateId: x.weaponTemplateId,
            }
            return weapon
        })
        newCharacter.startingWeapons = updatedWeapons
        newCharacter.currentWeapons = updatedWeapons
        newCharacter.bodyParts = BODY_PARTS.map((part) => ({
            ...part,
            currentDamage: 0,
            id: uuid.v4(),
        }))
        // Confirm character logic here
        dispatch(addCharacterToPosseMembers([newCharacter]))
        setTimeout(() => {
            setLoading(false)
            setCharacterSubmitted(newCharacter)
            setShowGeneratorQuestionaire(true)
            setInitialLoad(false) // ensures correctly animation direction for first screen
        }, 1000)
        //   router.replace(`./${selectedPosse?.posseId}`)
        //   router.back()
        //   router.back()
    }

    const handleError = (error: any) => {
        console.error('🚀 ~ characterEdit ~ error:', error)
    }

    const handleOnGeneratePress = (character: CharacterEditorForm) => {
        console.log('🚀 ~ handleOnGeneratePress ~ character:', character)
        methods.setValue('name', character.name)
        methods.setValue('gender', character.gender)
        methods.setValue('toughness', character.toughness)
        methods.setValue('startingWeapons', character.startingWeapons)
        methods.setValue('specialRules', character.specialRules)
        methods.setValue('bodyParts', character.bodyParts)
        methods.setValue('title', character.title)
        // set form values.
        // toggle generator state
        setShowGeneratorQuestionaire(false)
    }
    const handleCancel = () => {
        setShowGeneratorQuestionaire(true)
    }
    return (
        <>
            <PageContainer paddingSize="sm" fullScreenWidth={'50%'} style={{ marginBottom: bottom }}>
                <>
                    {showGeneratorQuestionaire ? (
                        <EditorGenerator
                            onSubmit={handleOnGeneratePress}
                            onCancelPress={() => {
                                setShowGeneratorQuestionaire(false)
                                router.back()
                            }}
                            quality={quality}
                            setQualityChange={setQuality}
                            speciality={speciality}
                            alignment={alignment}
                            gender={gender}
                            notoriety={notoriety}
                            setSpecialityChange={setSpeciality}
                            setAlignmentChange={setAlignment}
                            setGenderChange={setGender}
                            setNotorietyChange={setNotoriety}
                            initialLoad={initialLoad}
                        />
                    ) : (
                        <FormProvider {...methods}>
                            <EditorForm
                                startingWeaponsFields={startingWeaponsFields}
                                startingWeaponsAppend={appendStartingWeapon}
                                startingWeaponsRemove={removeStartingWeapon}
                                specialRulesFields={specialRulesFields}
                                specialRulesAppend={appendSpecialRule}
                                specialRulesRemove={removeSpecialRule}
                                onTraitsPress={handleTraitsModal}
                                onConfirmCharacter={handleConfirmCharacter}
                                onError={handleError}
                                onCancel={handleCancel}
                            />
                        </FormProvider>
                    )}
                </>
            </PageContainer>
            <ThemedBottomSheet
                scrollable
                visible={showBottomSheet}
                onClose={() => setShowBottomSheet(false)}
                allowCloseButton
                snapPoints={['40%', '40%']}
                headerTitle={'Create New Posse'}>
                <ThemedContainer style={{ backgroundColor: currentTheme.colors.background }}>
                    {SPEC_RULES.filter((x) => !x.weaponRule).map((rule, index) => {
                        const ruleFound = specialRulesFields.findIndex((r) => r.name === rule.name)
                        return (
                            <Controller
                                render={({ field }) => (
                                    <View
                                        key={index}
                                        style={{
                                            padding: padding,
                                            backgroundColor: specialRulesFields.some((r) => r.name === rule.name)
                                                ? currentTheme.colors.primary
                                                : 'transparent',
                                        }}>
                                        <Pressable
                                            onPress={() => {
                                                //   setTimeout(() => {
                                                //       setShowBottomSheet(false)
                                                //   }, 500)
                                                if (ruleFound == -1) {
                                                    appendSpecialRule(rule)
                                                } else {
                                                    removeSpecialRule(ruleFound)
                                                }
                                            }}>
                                            <ThemedText.Text type="semibold" inverted={ruleFound !== -1}>
                                                {rule.name}
                                            </ThemedText.Text>
                                            <ThemedText.Text inverted={ruleFound !== -1}>
                                                {rule.description}
                                            </ThemedText.Text>
                                        </Pressable>
                                    </View>
                                )}
                                name={'specialRules'}
                                control={methods.control}
                            />
                        )
                    })}
                </ThemedContainer>
            </ThemedBottomSheet>
            <CustomModal
                visible={loading}
                onClose={() => {}}
                children={
                    <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                        <ActivityIndicator size="large"></ActivityIndicator>
                        <ThemedText.Text>Adding to posse...</ThemedText.Text>
                    </View>
                }
            />
            <CustomModal
                visible={characterSubmitted !== null}
                onClose={() => {}}
                title={'Character Added'}
                children={
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ paddingVertical: margin, marginBottom: margin * 2, gap: padding }}>
                            {/* <FontAwesome6 name="handshake" size={48} color={currentTheme.colors.success} /> */}
                            {characterSubmitted?.gender == 'male' ? (
                                <Image
                                    source={require('../../assets/images/cowboy-sharper3.png')}
                                    resizeMode="contain"
                                    style={{
                                        height: 160,
                                        width: 80,
                                        //   backgroundColor: 'red',
                                        right: 0,
                                    }}
                                    height={160}
                                    width={80}
                                />
                            ) : (
                                <Image
                                    //  imageStyle={{ backgroundColor: 'red' }}
                                    source={require('../../assets/images/cowboy-f-rev.png')}
                                    resizeMode="contain"
                                    style={{
                                        height: 180,
                                        width: 100,
                                        //   backgroundColor: 'red',
                                        right: 0,
                                    }}
                                    height={180}
                                    width={100}
                                />
                            )}
                            <View style={{ alignItems: 'center', gap: padding }}>
                                <ThemedText.Text style={{ textAlign: 'center' }} type="semibold">
                                    {characterSubmitted?.name}
                                </ThemedText.Text>
                                <ThemedText.Text> {characterSubmitted?.title}</ThemedText.Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', gap: padding, alignItems: 'center' }}>
                            <ThemedButton
                                title={'Create New Character'}
                                onPress={() => {
                                    setCharacterSubmitted(null)
                                    setShowGeneratorQuestionaire(true)
                                }}
                                size={'sm'}
                            />
                            <ThemedButton
                                title={'Return to Posse Screen'}
                                onPress={() => {
                                    setCharacterSubmitted(null)
                                    router.replace(`./${selectedPosse?.posseId}`)
                                    router.back()
                                    router.back()
                                }}
                                variant="text"
                                size={'sm'}
                            />
                        </View>
                    </View>
                }
            />
        </>
    )
}

export default characterEdit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        height: '100%',
        borderRadius: 16,
        //   justifyContent: 'center',

        padding: padding * 2,
        borderColor: '#333',
    },
    selectedText: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '500',
    },
})
