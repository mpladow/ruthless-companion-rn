import { ThemedText } from '@/components'
import AnimatedCarousel from '@/components/Animated/AnimatedCarousel'
import GenderSwitcher from '@/components/features/GenderSwitcher/GenderSwitcher'
import Bullet from '@/components/Icons/Bullet'
import Messagebox from '@/components/Messagebox/Messagebox'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import HeadingTextInput from '@/components/ThemedTextInput/variants/HeadingTextinput'
import commonStyles from '@/constants/styles'
import { WEAPONS } from '@/data/weapons'
import { SpecialRule } from '@/models/specialRuleTemplate'
import { Weapon } from '@/models/weapon'
import { borderRadius, borderWidth, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import React, { useState } from 'react'
import { Controller, FieldArrayWithId, SubmitHandler, useFormContext } from 'react-hook-form'
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CharacterEditorForm } from './editor'

type EditorFormProps = {
    startingWeaponsFields: FieldArrayWithId<CharacterEditorForm, 'startingWeapons', 'id'>[]
    startingWeaponsAppend: (item: Weapon) => void
    startingWeaponsRemove: (id: number) => void
    specialRulesFields: FieldArrayWithId<CharacterEditorForm, 'specialRules', 'id'>[]
    specialRulesAppend: (item: SpecialRule) => void
    specialRulesRemove: (id: number) => void
    onTraitsPress: () => void
    onConfirmCharacter: SubmitHandler<CharacterEditorForm>
    onError: (error: any) => void
    onCancel: () => void
}
const EditorForm = ({
    startingWeaponsAppend,
    startingWeaponsRemove,
    specialRulesFields,
    specialRulesAppend,
    specialRulesRemove,
    onTraitsPress,
    onConfirmCharacter,
    onError,
    onCancel,
}: EditorFormProps) => {
    const { bottom } = useSafeAreaInsets()
    const { currentTheme } = useTheme()
    const {
        control,
        formState: { isValid },
        handleSubmit,
    } = useFormContext<CharacterEditorForm>()
    const [showAdditionalWeaponOption, setShowAdditionalWeaponOption] = useState(false)
    const handleToggleAdditionalWeapon = () => {
        setShowAdditionalWeaponOption((prev) => !prev)
        startingWeaponsRemove(1) // Remove the second weapon if it exists
    }

    return (
        <>
            <Animated.ScrollView
                entering={Platform.OS !== 'web' ? SlideInRight.delay(100) : undefined}
                exiting={Platform.OS !== 'web' ? SlideOutRight : undefined}
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: margin * 3 }}>
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
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Controller
                                render={({ field: { value, onChange } }) => (
                                    <View style={{ padding: padding, paddingBottom: padding * 2, flex: 1 }}>
                                        <HeadingTextInput
                                            label="Character Name"
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
                                render={({ field: { value, onChange } }) => (
                                    <View style={{ padding: padding, paddingBottom: padding * 2, flex: 1 }}>
                                        <HeadingTextInput
                                            label="Character Title (OPTIONAL)"
                                            value={value.toString()}
                                            defaultValue={value.toString()}
                                            onChangeText={onChange}
                                            selectTextOnFocus={true}
                                            placeholder="The Unknown"
                                            maxLength={30}
                                            autoCapitalize="words"
                                            autoCorrect={false}
                                        />
                                    </View>
                                )}
                                name={'title'}
                                control={control}
                            />
                        </View>
                        <Controller
                            render={({ field }) => (
                                <View style={{ padding: padding, paddingBottom: padding * 2 }}>
                                    <HeadingTextInput
                                        label="Toughness"
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
                                onPress={onTraitsPress}
                                size={'sm'}
                                variant="ghost"
                                type="primary"
                            />
                        </View>
                        {specialRulesFields.map((rule, index) => (
                            <View
                                key={rule.id || rule.name || index}
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
                                        const idx = specialRulesFields.findIndex((r) => r.name === rule.name)
                                        if (idx !== -1) {
                                            specialRulesRemove(idx)
                                        }
                                    }}>
                                    <View style={{ flex: 1 }}>
                                        <ThemedText.Text type="semibold">{rule.name}</ThemedText.Text>
                                        <ThemedText.Text>{rule.description}</ThemedText.Text>
                                    </View>
                                    <View>
                                        <Entypo name="cross" size={24} color={currentTheme.colors.error} />
                                    </View>
                                </Pressable>
                                {specialRulesFields.length - 1 === index && <View style={{ height: padding * 2 }} />}
                            </View>
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
                                                <ThemedText.Heading headingSize="h3">{item.name}</ThemedText.Heading>
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
                                                    {[...Array(item.maxAmmunition)].map((_, idx) => (
                                                        <View
                                                            key={item.name + '-ammo-' + idx}
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
                                                    {item.specialRules.map((rule, idx) => (
                                                        <ThemedText.Text key={rule.name + idx}>{rule.description}</ThemedText.Text>
                                                    ))}
                                                </View>
                                            )}
                                        </View>
                                    )}
                                    onSelect={(_, idx) => {
                                        field.onChange(idx)
                                        startingWeaponsRemove(0) // Remove the first weapon if it exists
                                        startingWeaponsAppend(WEAPONS[idx])
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
                                                        {[...Array(item.maxAmmunition)].map((_, idx) => (
                                                            <View
                                                                key={item.name + '-ammo-' + idx}
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
                                                        {item.specialRules.map((rule, idx) => (
                                                            <ThemedText.Text key={rule.name + idx}>{rule.description}</ThemedText.Text>
                                                        ))}
                                                    </View>
                                                )}
                                            </View>
                                        )}
                                        onSelect={(_, idx) => {
                                            field.onChange(idx)
                                            startingWeaponsRemove(1) // Remove the first weapon if it exists
                                            startingWeaponsAppend(WEAPONS[idx])
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
                                    showAdditionalWeaponOption ? 'Remove additional weapon' : 'Add additional weapon'
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
                            }}></View>
                    </View>
                </ThemedContainer>
            </Animated.ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 6,
                    marginBottom: Platform.OS == 'android' ? margin * 4 : margin * 2,
                    marginTop: margin,
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}>
                <View style={{ flex: 1 }}>
                    <ThemedButton title={'< Back'} onPress={onCancel} size={'lg'} type="primary" variant="ghost" />
                </View>
                <View style={{ flex: 2 }}>
                    <ThemedButton
                        title={'Save Character'}
                        onPress={handleSubmit(onConfirmCharacter, onError)}
                        size={'lg'}
                        type="primary"
                    />
                </View>
            </View>
        </>
    )
}

export default EditorForm

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
