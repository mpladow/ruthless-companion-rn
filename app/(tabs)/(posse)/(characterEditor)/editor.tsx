import { ThemedBottomSheet, ThemedText } from '@/components'
import AnimatedCarousel from '@/components/Animated/AnimatedCarousel'
import GenderSwitcher, { GenderType } from '@/components/features/GenderSwitcher/GenderSwitcher'
import Bullet from '@/components/Icons/Bullet'
import Messagebox from '@/components/Messagebox/Messagebox'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import HeadingTextInput from '@/components/ThemedTextInput/variants/HeadingTextinput'
import commonStyles from '@/constants/styles'
import { BODY_PARTS } from '@/data/body_parts'
import { SPEC_RULES } from '@/data/special_rules'
import { WEAPONS } from '@/data/weapons'
import { BodyPart, BodyPartTemplate } from '@/models/bodyParttemplate'
import { CharacterTemplate } from '@/models/characterTemplate'
import { PlayerCharacter } from '@/models/playerCharacter'
import { SpecialRule, SpecialRuleTemplate } from '@/models/specialRuleTemplate'
import { Weapon, WeaponTemplate } from '@/models/weapon'
import { addCustomCharacter } from '@/state/editor/customCharactersSlice'
import { addCharacterToPosseMembers } from '@/state/posse/posseSlice'
import { AppDispatch, RootState } from '@/state/store'
import { borderRadius, borderWidth, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid'
import { useDispatch, useSelector } from 'react-redux'

type CharacterEditorForm = {
    name: string
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
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const { currentTheme } = useTheme()
    const { bottom } = useSafeAreaInsets()
    const [showAdditionalWeaponOption, setShowAdditionalWeaponOption] = useState(false)

    const router = useRouter()
    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        formState: {
            errors,
            isValid,
            isDirty,
            isSubmitting,
            isSubmitSuccessful,
            dirtyFields,
            touchedFields,
            submitCount,
        },
    } = useForm<CharacterEditorForm>({
        defaultValues: {
            name: 'New Character',
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
        fields: specialRuleFields,
        append: appendSpecialRule,
        remove: removeSpecialRule,
    } = useFieldArray({
        control,
        name: 'specialRules',
    })
    const {
        fields: startingWeaponFields,
        append: appendStartingWeapon,
        remove: removeStartingWeapon,
    } = useFieldArray({
        control,
        name: 'startingWeapons',
    })

    const handleTraitsModal = useCallback(() => {
        setShowBottomSheet(!showBottomSheet)
    }, [])

    const handleConfirmCharacter = (data: CharacterEditorForm) => {
        console.log('🚀 ~ handleConfirmCharacter ~ data:', data.startingWeapons)
        // TODO: remove this and create the character template first.
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

        newCharacterTemplate.startingWeapons = data.startingWeapons.map((x) => {
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
            isCustom: true,
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
        console.log('🚀 ~ handleConfirmCharacter ~ newCharacter dfd:', newCharacter)
        // Confirm character logic here
        dispatch(addCharacterToPosseMembers([newCharacter]))
        router.replace(`./${selectedPosse?.posseId}`)
        router.back()
        router.back()
    }

    useEffect(() => {
        console.log(customCharacters, 'customCharacters')
    }, [customCharacters.length])
    const handleError = (error: any) => {
        console.error('🚀 ~ characterEdit ~ error:', error)
    }
    const handleToggleAdditionalWeapon = () => {
        setShowAdditionalWeaponOption((prev) => !prev)
        removeStartingWeapon(1) // Remove the second weapon if it exists
    }

    // TEST
    //  const fetchDataWithCallback = (callback: any) => {
    //       return async (dispatch, getState) => {
    //           dispatch({ type: 'FETCH_DATA_START' })
    //           try {
    //               const response = await fetch('your_api_endpoint')
    //               const data = await response.json()
    //               dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }).then((res) => {
    // 						console.log('Data fetched successfully:', res)
    // 				  })
    //               callback(data)
    //           } catch (error) {
    //               dispatch({ type: 'FETCH_DATA_ERROR', payload: error })
    //           }
    //       }
    //   }
    // END TEST

    return (
        <>
            <PageContainer
                paddingSize="sm"
                paddingVertical="lg"
                fullScreenWidth={'50%'}
                style={{ marginBottom: bottom }}>
                <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: margin * 3 }}>
                    <ThemedContainer paddingHorizontal="sm" paddingVertical="sm">
                        {!isValid && (
                            <Messagebox type={'error'}>
                                <ThemedText.Text>Check your form and try again</ThemedText.Text>
                            </Messagebox>
                        )}
                    </ThemedContainer>

                    <ThemedContainer
                        style={[
                            {
                                borderWidth: borderWidth + 1,
                                borderRadius: borderRadius / 2,
                                overflow: 'hidden',
                            },
                            commonStyles.boxShadow,
                        ]}>
                        <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 2 }}>
                            <ThemedText.Text type="bold">1. Edit Name, Toughness and Gender</ThemedText.Text>
                        </View>
                        <Image
                            source={require('../../../../assets/images/card-texture.png')}
                            resizeMode="contain"
                            style={{
                                opacity: 0.2,
                                position: 'absolute',
                                tintColor: 'rgba(0, 0, 0, 0.8)',
                                zIndex: 0, // Adjust opacity as needed
                            }}
                        />

                        {/* Heading */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: padding }}>
                            <Controller
                                render={({ field: { value, onChange } }) => (
                                    <View style={{ padding: padding, paddingBottom: padding * 2, flex: 1 }}>
                                        <HeadingTextInput
                                            value={value.toString()}
                                            defaultValue={value.toString()}
                                            onChangeText={onChange}
                                            selectTextOnFocus={true}
                                        />
                                    </View>
                                )}
                                name={'name'}
                                control={control}
                            />

                            <Controller
                                render={({ field }) => (
                                    <View style={{ padding: padding, paddingBottom: padding * 2 }}>
                                        <HeadingTextInput
                                            value={field.value.toString()}
                                            onChangeText={field.onChange}
                                            keyboardType="numeric"
                                            selectTextOnFocus={true}
                                            maxLength={2}
                                        />
                                    </View>
                                )}
                                name={'toughness'}
                                control={control}
                            />
                        </View>
                        <Controller
                            render={({ field }) => (
                                <View style={{ paddingLeft: padding }}>
                                    <GenderSwitcher value={field.value} onChange={field.onChange} />
                                </View>
                            )}
                            name={'gender'}
                            control={control}
                        />
                        {/* 2. Traits */}
                        <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 2 }}>
                            <ThemedText.Text type="bold">2. Select character trait(s)</ThemedText.Text>
                            <View style={{ padding: padding * 2 }}>
                                <ThemedButton
                                    title={'Select Traits'}
                                    onPress={handleTraitsModal}
                                    size={'sm'}
                                    variant="ghost"
                                    type="primary"
                                />
                            </View>
                            {specialRuleFields.map((rule, index) => (
                                <Controller
                                    render={({ field }) => (
                                        <>
                                            <View
                                                key={index}
                                                style={{
                                                    paddingHorizontal: padding * 2,
                                                    paddingVertical: padding,
                                                    borderWidth: 2,
                                                    borderColor: currentTheme.colors.primary,
                                                }}>
                                                <Pressable
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                    onPress={() => {
                                                        const index = specialRuleFields.findIndex(
                                                            (r) => r.name === rule.name
                                                        )
                                                        console.log('🚀 ~ characterEdit ~ index:', index)
                                                        if (index !== -1) {
                                                            removeSpecialRule(index)
                                                        }
                                                    }}>
                                                    <View style={{ flex: 1 }}>
                                                        <ThemedText.Text type="semibold">{rule.name}</ThemedText.Text>
                                                        <ThemedText.Text>{rule.description}</ThemedText.Text>
                                                    </View>
                                                    <View>
                                                        <Entypo
                                                            name="cross"
                                                            size={24}
                                                            color={currentTheme.colors.error}
                                                        />
                                                    </View>
                                                </Pressable>
                                            </View>
                                            {specialRuleFields.length - 1 == index && (
                                                <View style={{ height: padding * 2 }}></View>
                                            )}
                                        </>
                                    )}
                                    name={'specialRules'}
                                    control={control}
                                />
                            ))}
                        </View>
                        <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 2 }}>
                            <ThemedText.Text type="bold">3. Select starting weapon(s)</ThemedText.Text>
                            <Controller
                                render={({ field }) => (
                                    <AnimatedCarousel
                                        data={WEAPONS}
                                        itemWidth={200}
                                        renderItem={(item, isSelected) => (
                                            <View
                                                style={[
                                                    styles.cardContent,
                                                    {
                                                        borderColor: isSelected ? '#333' : 'transparent',
                                                        borderWidth: 2,
                                                    },
                                                ]}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        width: '100%',
                                                    }}>
                                                    <ThemedText.Heading headingSize="h3">
                                                        {item.name}
                                                    </ThemedText.Heading>
                                                    <ThemedText.Text>
                                                        {item.shortRange}" / {item.longRange}"
                                                    </ThemedText.Text>
                                                </View>
                                                {item.maxAmmunition && (
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            flexWrap: 'wrap',
                                                            gap: 2,
                                                        }}>
                                                        {[...Array(item.maxAmmunition)].map((_, index) => (
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
                                                )}
                                                {item.specialRules && item.specialRules.length > 0 && (
                                                    <View>
                                                        <ThemedText.Text type="bold">Special Rules:</ThemedText.Text>
                                                        {item.specialRules.map((rule, index) => (
                                                            <ThemedText.Text key={index}>
                                                                {rule.description}
                                                            </ThemedText.Text>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                        onSelect={(_, idx) => {
                                            field.onChange(idx)
                                            removeStartingWeapon(0) // Remove the first weapon if it exists
                                            appendStartingWeapon(WEAPONS[idx])
                                        }}
                                        initialIndex={field.value}
                                    />
                                )}
                                control={control}
                                name={'selectedWeaponIndex1'}
                            />
                        </View>
                        <View style={{ paddingVertical: padding * 2, paddingHorizontal: padding * 2 }}>
                            <ThemedText.Text type="bold">4. (OPTIONAL) Select additional weapon(s)</ThemedText.Text>
                            {showAdditionalWeaponOption && (
                                <Controller
                                    render={({ field }) => (
                                        <AnimatedCarousel
                                            data={WEAPONS}
                                            itemWidth={200}
                                            renderItem={(item, isSelected) => (
                                                <View
                                                    style={[
                                                        styles.cardContent,
                                                        {
                                                            borderColor: isSelected ? '#333' : 'transparent',
                                                            borderWidth: 2,
                                                        },
                                                    ]}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            width: '100%',
                                                        }}>
                                                        <ThemedText.Heading headingSize="h3">
                                                            {item.name}
                                                        </ThemedText.Heading>
                                                        <ThemedText.Text>
                                                            {item.shortRange}" / {item.longRange}"
                                                        </ThemedText.Text>
                                                    </View>
                                                    {item.maxAmmunition && (
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                flexWrap: 'wrap',
                                                                gap: 2,
                                                            }}>
                                                            {[...Array(item.maxAmmunition)].map((_, index) => (
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
                                                    )}
                                                    {item.specialRules && item.specialRules.length > 0 && (
                                                        <View>
                                                            <ThemedText.Text type="bold">
                                                                Special Rules:
                                                            </ThemedText.Text>
                                                            {item.specialRules.map((rule, index) => (
                                                                <ThemedText.Text key={index}>
                                                                    {rule.description}
                                                                </ThemedText.Text>
                                                            ))}
                                                        </View>
                                                    )}
                                                </View>
                                            )}
                                            onSelect={(_, idx) => {
                                                field.onChange(idx)
                                                removeStartingWeapon(1) // Remove the first weapon if it exists
                                                appendStartingWeapon(WEAPONS[idx])
                                            }}
                                            initialIndex={field.value}
                                        />
                                    )}
                                    control={control}
                                    name={'selectedWeaponIndex2'}
                                />
                            )}
                            <View style={{ padding: padding * 2 }}>
                                <ThemedButton
                                    title={
                                        showAdditionalWeaponOption
                                            ? 'Remove additional weapon'
                                            : 'Add additional weapon'
                                    }
                                    onPress={handleToggleAdditionalWeapon}
                                    type="secondary"
                                    variant="ghost"
                                    size={'sm'}
                                />
                            </View>
                        </View>
                        <View></View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                            </View>
                        </View>
                    </ThemedContainer>
                </ScrollView>
                <View style={Platform.OS == 'android' ? { marginBottom: bottom * 2 } : {}}>
                    <ThemedButton
                        title={'Save Character'}
                        onPress={handleSubmit(handleConfirmCharacter, handleError)}
                        size={'lg'}
                        type="primary"
                    />
                </View>
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
                        const ruleFound = specialRuleFields.findIndex((r) => r.name === rule.name)
                        return (
                            <Controller
                                render={({ field }) => (
                                    <View
                                        key={index}
                                        style={{
                                            padding: padding,
                                            backgroundColor: specialRuleFields.some((r) => r.name === rule.name)
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
                                control={control}
                            />
                        )
                    })}
                </ThemedContainer>
            </ThemedBottomSheet>
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
