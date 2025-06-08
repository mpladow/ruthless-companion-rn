import { ThemedText } from '@/components'
import AnimatedCarousel from '@/components/Animated/AnimatedCarousel'
import CardHeading from '@/components/features/CharacterCard/Heading'
import Bullet from '@/components/Icons/Bullet'
import Messagebox from '@/components/Messagebox/Messagebox'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedContainer from '@/components/ThemedContainer'
import HeadingTextInput from '@/components/ThemedTextInput/variants/HeadingTextinput'
import commonStyles from '@/constants/styles'
import { WEAPONS } from '@/data/weapons'
import { BodyPartTemplate } from '@/models/bodyParttemplate'
import { WeaponTemplate } from '@/models/weapon'
import { RootState } from '@/state/store'
import { borderRadius, borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

const characterEdit = () => {
    const posse = useSelector((state: RootState) => state.selectedPosse)
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [showNameForm, setShowNameForm] = useState(false)
    const [showToughnessForm, setShowToughnessForm] = useState(false)
    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            name: 'New Character',
            toughness: 5,
            startingWeapon: {} as WeaponTemplate,
            selectedWeaponIndex: 0,
            bodyParts: [] as BodyPartTemplate[],
        },
    })

    const onHandleFormClose = () => {
        // on press, then open form to change name as modal;
        setShowBottomSheet(false)
    }
    const handleWeaponSelect = () => {}
    const { currentTheme } = useTheme()
    return (
        <>
            <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={false}>
                    <ThemedContainer paddingHorizontal="sm" paddingVertical="sm">
                        <Messagebox type={'warning'}>
                            <ThemedText.Text>Press each section to edit character details</ThemedText.Text>
                        </Messagebox>
                    </ThemedContainer>
                    <ThemedText.Text type="bold">1. Edit Name and Toughness</ThemedText.Text>

                    <ThemedContainer
                        style={[
                            {
                                borderWidth: borderWidth + 1,
                                borderRadius: borderRadius / 2,
                                overflow: 'hidden',
                            },
                            commonStyles.boxShadow,
                        ]}>
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
                        <CardHeading>
                            <Controller
                                render={({ field }) => (
                                    <>
                                        <HeadingTextInput
                                            value={field.value.toString()}
                                            onChangeText={field.onChange}
                                            selectTextOnFocus={true}
                                        />
                                    </>
                                )}
                                name={'name'}
                                control={control}
                            />
                            <Controller
                                render={({ field }) => (
                                    <>
                                        <HeadingTextInput
                                            value={field.value.toString()}
                                            onChangeText={field.onChange}
                                            keyboardType="numeric"
                                            selectTextOnFocus={true}
                                        />
                                    </>
                                )}
                                name={'toughness'}
                                control={control}
                            />
                        </CardHeading>
                        <ThemedText.Text type="bold">2. Select starting weapon(s)</ThemedText.Text>
                        <Controller
                            render={({ field }) => (
                                <AnimatedCarousel
                                    data={WEAPONS}
                                    itemWidth={200}
                                    renderItem={(item, isSelected) => (
                                        <View
                                            style={[
                                                styles.cardContent,
                                                // {
                                                //     borderColor: isSelected ? '#333' : 'transparent',
                                                //     borderWidth: isSelected ? 2 : 0,
                                                // },
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

                                            {item.specialRules.map((rule, index) => (
                                                <View key={index}>
                                                    <ThemedText.Text type="semibold">{rule.name}</ThemedText.Text>
                                                    <ThemedText.Text>{rule.description}</ThemedText.Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    onSelect={(_, idx) => {
                                        field.onChange(idx)
                                    }}
                                    initialIndex={field.value}
                                />
                            )}
                            control={control}
                            name={'selectedWeaponIndex'}
                        />
                        <View></View>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                {/* <AnimatedAccordion viewKey="playerCharacter.weapon" isExpanded={isExpanded}>
                            {playerCharacter.currentWeapons?.map((item, index) => (
                                <WeaponContainer weapon={item} onAmmoChange={handleWeaponAmmoChange} />
                            ))}
                        </AnimatedAccordion> */}
                            </View>
                            {/* <TouchableWithoutFeedback onPress={handleExpandToggle}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: padding,
                            }}>
                            <ExpandedIndicator isExpanded={!collapsed} onPress={handleExpandToggle} />
                        </View>
                    </TouchableWithoutFeedback> */}
                        </View>
                    </ThemedContainer>
                </ScrollView>
            </PageContainer>
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
        //   height: 200,
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
