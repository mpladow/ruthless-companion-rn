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
import { margin } from '@/theme/constants'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native'
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
                    gender: x.gender,
                    isCustom: true,
                    order: posse?.members ? posse?.members.length + 1 : 0,
                }
                return newPc
            })
            setPregeneratedCharacters((prev) => [...prev, ...customCharacterInstances])
        }
    }, [customCharacters])

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
        dispatch(addCharacterToPosseMembers(characters))
        setTimeout(() => {
            // this is gross but it works and shouldn't break. not sure why replace is not working for this route.
            router.replace(`./${posse?.posseId.toString()}`)
            router.back()
            router.back()
            setLoading(false)
        }, 1000)
    }
    return (
        // pregenerated characters
        <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
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
                                <CharacterCardReadOnly playerCharacter={item} collapsedView={true} readOnly />
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
            {charactersToAdd.length > 0 && (
                <Animated.View
                    entering={Platform.OS !== 'web' ? SlideInDown : undefined}
                    style={{ position: 'absolute', bottom: insets.bottom * 3, right: margin, width: '100%' }}>
                    <ThemedButton
                        title={`Add ${charactersToAdd.length} Character${charactersToAdd.length > 1 ? 's' : ''}`}
                        onPress={handleAddToPosse}
                        size={'lg'}
                        type="secondary"
                    />
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
    )
}

export default PreselectedCharacters

const styles = StyleSheet.create({})
