import { AnimatedFlatList, ThemedText } from '@/components'
import Checkbox from '@/components/Checkbox/Checkbox'
import CharacterCardReadOnly from '@/components/features/CharacterCard/CharacterCardReadOnly'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { BODY_PARTS } from '@/data/body_parts'
import { DODGE_CITY_SCENARIO } from '@/data/Pregenerated'
import { PlayerCharacter } from '@/models/playerCharacter'
import { addCharacterToPosseMembers } from '@/state/posse/posseSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid'
import { useDispatch, useSelector } from 'react-redux'

const PreselectedCharacters = () => {
    const { bottom } = useSafeAreaInsets()
    const [charactersToAdd, setCharactersToAdd] = useState<string[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const posse = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.selectedPosse : null
    })

    const customCharacters = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.customCharacters : []
    })
    const [pregeneratedCharacters, setPregeneratedCharacters] = useState(DODGE_CITY_SCENARIO)

    const { currentTheme } = useTheme()
    const [customPCs, setCustomPCs] = useState<PlayerCharacter[]>([])

    useEffect(() => {
        if (customCharacters.length > 0) {
            let customCharacterInstances = customCharacters.map((x) => {
                let newPc: PlayerCharacter = {
                    playerCharacterId: uuid.v4(),
                    name: x.name,
                    specialRules: x.specialRules,
                    bodyParts: BODY_PARTS.map((part) => ({
                        ...part,
                        currentDamage: 0,
                        id: uuid.v4(),
                    })),
                    characterTemplateId: x.characterTemplateId,
                    toughness: x.toughness,
                    startingWeapons: x.startingWeapons,
                    currentWeapons: x.startingWeapons,
                    gender: x.gender,
                    isCustom: true,
                    order: posse?.members ? posse?.members.length + 1 : 0,
                }
                return newPc
            })
            setCustomPCs(customCharacterInstances)
        }
    }, [customCharacters])

    useEffect(() => {
        // filter out pregenerated characters that are already in the posse
        if (posse?.members) {
            const filtered = pregeneratedCharacters.filter(
                (x) => !posse.members.find((m) => m.playerCharacterId === x.playerCharacterId)
            )
            setPregeneratedCharacters(filtered)
        }
    }, [posse])

    useEffect(() => {
        // filter out custom characters that are already in the posse
        if (posse?.members && customPCs.length > 0) {
            const filteredCustom = customPCs.filter(
                (x) => !posse.members.find((m) => m.playerCharacterId === x.playerCharacterId)
            )
            setCustomPCs(filteredCustom)
        }
    }, [posse])

    const handleCheckPress = (characterId: string) => {
        const idFound = charactersToAdd.find((x) => x == characterId)
        if (idFound) {
            setCharactersToAdd(charactersToAdd.filter((x) => x != characterId))
        } else {
            setCharactersToAdd([...charactersToAdd, characterId])
        }
    }
    const insets = useSafeAreaInsets()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleAddToPosse = () => {
        setLoading(true)
        const characters = pregeneratedCharacters.filter((x) => charactersToAdd.includes(x.playerCharacterId))
        const customCharacters = customPCs.filter((x) => charactersToAdd.includes(x.playerCharacterId))
        const toAdd = [...characters, ...customCharacters]
        dispatch(addCharacterToPosseMembers(toAdd))
        setTimeout(() => {
            // this is gross but it works and shouldn't break. not sure why replace is not working for this route.
            router.replace(`./${posse?.posseId.toString()}`)
            router.back()
            router.back()
            setLoading(false)
        }, 1000)
    }
    const [index, setIndex] = useState(0)
    return (
        // pregenerated characters
        <>
            {/* <View style={{ backgroundColor: currentTheme.colors.primary, paddingTop: 20, padding: padding * 4 }}>
                <ThemedText.Heading headingSize="h1" inverted>
                    Hello
                </ThemedText.Heading>
                <ThemedText.Text inverted>
                    You can select pregenerated characters, or select your existing custom characters.
                </ThemedText.Text>
            </View> */}
            <View
                style={{
                    backgroundColor: currentTheme.colors.primary,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: margin * 3,
                }}>
                <View
                    style={{
                        backgroundColor: currentTheme.colors.primary,
                        paddingTop: 20,
                        paddingHorizontal: padding * 3,
                        paddingVertical: padding * 4,
                        flexDirection: 'row',
                    }}>
                    <Pressable
                        style={[
                            { padding: padding * 2, alignItems: 'center' },
                            index == 0 && { borderBottomWidth: 2, borderBottomColor: currentTheme.colors.secondary },
                        ]}
                        onPress={() => setIndex(0)}>
                        <ThemedText.Text inverted style={[index !== 0 && { color: currentTheme.colors.greyOutline }]}>
                            Pregenerated
                        </ThemedText.Text>
                    </Pressable>
                    <Pressable
                        style={[
                            { padding: padding * 2, alignItems: 'center' },
                            index == 1 && { borderBottomWidth: 2, borderBottomColor: currentTheme.colors.secondary },
                        ]}
                        onPress={() => setIndex(1)}>
                        <ThemedText.Text inverted style={[index !== 1 && { color: currentTheme.colors.greyOutline }]}>
                            Custom
                        </ThemedText.Text>
                    </Pressable>
                </View>
                <View>
                    {charactersToAdd.length > 0 && (
                        <Pressable
                            style={{ padding: padding * 2, alignItems: 'center' }}
                            onPress={() => setCharactersToAdd([])}>
                            <ThemedText.Text inverted>Deselect All</ThemedText.Text>
                        </Pressable>
                    )}
                </View>
            </View>
            <PageContainer paddingSize="sm" fullScreenWidth={'50%'}>
                {index == 0 ? (
                    <AnimatedFlatList
                        data={pregeneratedCharacters}
                        contentContainerStyle={{ paddingBottom: bottom - 150 }}
                        style={{ flex: 1 }}
                        ListFooterComponent={() => <View style={{ height: insets.bottom * 4 }}></View>}
                        ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                        renderItem={({ item, index }) => (
                            <Pressable
                                key={item.playerCharacterId}
                                onPress={(val) => handleCheckPress(item.playerCharacterId)}>
                                <View style={{ flexDirection: 'row', flexGrow: 1, width: '100%', gap: 6 }}>
                                    <View style={{ flex: 1 }}>
                                        <CharacterCardReadOnly
                                            playerCharacter={item}
                                            collapsedView={true}
                                            readOnly
                                            showDetails={true}
                                        />
                                    </View>

                                    <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onPress={(val) => handleCheckPress(item.playerCharacterId)}
                                            isChecked={charactersToAdd.includes(item.playerCharacterId)}
                                            boxSize={'sm'}
                                            isLastItem={false}
                                        />
                                        {/* <View
                                style={{
                                    width: 30,
                                    height: 30,
                                    borderWidth: 3,
                                    borderRadius: borderRadius / 2,
                                }}></View> */}
                                    </Animated.View>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={(item) => String(item.playerCharacterId)}
                    />
                ) : (
                    <AnimatedFlatList
                        data={customPCs}
                        contentContainerStyle={{ paddingBottom: bottom - 150 }}
                        style={{ flex: 1 }}
                        ListFooterComponent={() => <View style={{ height: insets.bottom * 4 }}></View>}
                        ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                        renderItem={({ item, index }) => (
                            <Pressable
                                key={item.playerCharacterId}
                                onPress={(val) => handleCheckPress(item.playerCharacterId)}>
                                <View style={{ flexDirection: 'row', flexGrow: 1, width: '100%', gap: 6 }}>
                                    <View style={{ flex: 1 }}>
                                        <CharacterCardReadOnly
                                            playerCharacter={item}
                                            collapsedView={true}
                                            readOnly
                                            showDetails={true}
                                        />
                                    </View>

                                    <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onPress={(val) => handleCheckPress(item.playerCharacterId)}
                                            isChecked={charactersToAdd.includes(item.playerCharacterId)}
                                            boxSize={'sm'}
                                            isLastItem={false}
                                        />
                                        {/* <View
									 style={{
										  width: 30,
										  height: 30,
										  borderWidth: 3,
										  borderRadius: borderRadius / 2,
									 }}></View> */}
                                    </Animated.View>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={(item) => String(item.playerCharacterId)}
                    />
                )}
                {charactersToAdd.length > 0 && (
                    <Animated.View
                        entering={Platform.OS !== 'web' ? SlideInDown : undefined}
                        style={{
                            position: 'absolute',
                            bottom: insets.bottom + margin * 2,
                            left: 0,
                            right: 0,

                            width: Dimensions.get('window').width,
                        }}>
                        <View style={{ paddingHorizontal: margin * 2 }}>
                            <ThemedButton
                                title={`Add ${charactersToAdd.length} Character${
                                    charactersToAdd.length > 1 ? 's' : ''
                                }`}
                                onPress={handleAddToPosse}
                                size={'lg'}
                                type="secondary"
                            />
                        </View>
                    </Animated.View>
                )}
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
            </PageContainer>
        </>
    )
}

export default PreselectedCharacters

const styles = StyleSheet.create({})
