import { AnimatedFlatList, ThemedText } from '@/components'
import CharacterCardReadOnly from '@/components/features/CharacterCard/CharacterCardReadOnly'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { BODY_PARTS } from '@/data/body_parts'
import { PlayerCharacter } from '@/models/playerCharacter'
import { deleteCustomCharacter } from '@/state/editor/customCharactersSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import uuid from 'react-native-uuid'
import { useDispatch, useSelector } from 'react-redux'

const editCustomData = () => {
    const customCharacters = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.customCharacters : []
    })
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : []
    })
    const { bottom } = useSafeAreaInsets()
    const [deleteModal, setDeleteModal] = useState(false)
    const [customPCs, setCustomPCs] = useState<PlayerCharacter[]>([])
    const [focused, setFocused] = useState<string | null>(null)
    const { currentTheme } = useTheme()
    const router = useRouter()

    const dispatch = useDispatch<AppDispatch>()


    const handleCheckPress = (characterId: string) => {
        console.log('🚀 ~ handleCheckPress ~ characterId:', characterId)
        let alreadyExists = false
        let posseName = ''
        // check if this character already exists in any of the posses;
        posses.forEach((posse) => {
            console.log('🚀 ~ posses.forEach ~ posse:', posse)
            const characterExists = posse.members.find((pc) => pc.characterTemplateId == characterId)
            if (characterExists) {
                alreadyExists = true
                posseName = posse.name
            }
        })
        console.log('🚀 ~ handleCheckPress ~ alreadyExists:', alreadyExists)
        if (alreadyExists) {
            alert(`This character is already in the ${posseName} posse and cannot be deleted.`)
        } else {
            setFocused(characterId)
            setDeleteModal(true)
        }
    }
    const handleEditData = () => {
        router.navigate(`../(characterEditor)/(EditExistingTemplate)/${focused}`)
        setFocused(null)
    }
    const handleConfirmDeletePress = () => {
        if (focused) {
            setDeleteModal(false)
            dispatch(deleteCustomCharacter(focused))
        }
    }

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
                    order: 0,
                }
                return newPc
            })
            setCustomPCs(customCharacterInstances)
        }
    }, [customCharacters])

    return (
        <>
            <PageContainer fullScreenWidth={null} paddingVertical="lg" paddingHorizontal="sm">
                <AnimatedFlatList
                    data={customPCs}
                    contentContainerStyle={{ paddingBottom: bottom - 150 }}
                    style={{ flex: 1 }}
                    ListEmptyComponent={() => (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText.Text type="semibold">No custom characters found.</ThemedText.Text>
                        </View>
                    )}
                    ListFooterComponent={() => <View style={{ height: bottom * 4 }}></View>}
                    ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                    renderItem={({ item, index }) => (
                        <Pressable key={item.characterTemplateId} onPress={() => {}}>
                            <View style={{ flexDirection: 'row', flexGrow: 1, width: '100%', gap: 6 }}>
                                <View style={{ flex: 1 }}>
                                    <CharacterCardReadOnly
                                        playerCharacter={item}
                                        collapsedView={true}
                                        readOnly
                                        showDetails={false}
                                    />
                                </View>
                                {/* <Animated.View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        gap: 6,
                                    }}>
                                    <ThemedButton
                                        title={
                                            <FontAwesome name="pencil" size={24} color={currentTheme.colors.primary} />
                                        }
                                        type="primary"
                                        variant="ghost"
                                        onPress={() => {
                                            setFocused(item.characterTemplateId)
                                        }}
                                        size={'sm'}
                                    />
                                </Animated.View> */}

                                <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <ThemedButton
                                        title={
                                            <AntDesign
                                                name="delete"
                                                size={24}
                                                color={currentTheme.colors.textInverted}
                                            />
                                        }
                                        onPress={() => {
                                            handleCheckPress(item.characterTemplateId)
                                        }}
                                        type="primary"
                                        size={'sm'}
                                    />
                                </Animated.View>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item) => String(item.playerCharacterId)}
                />
            </PageContainer>

            <CustomModal
                visible={deleteModal}
                onClose={() => {
                    setDeleteModal(false)
                }}>
                <View>
                    <View style={{ padding: padding * 2, paddingBottom: padding * 6 }}>
                        <ThemedText.Text>Are you sure you want to delete this character?</ThemedText.Text>
                    </View>
                    <View>
                        <ThemedButton title="Delete Posse" onPress={handleConfirmDeletePress} size={'lg'} />
                        <View style={{ height: padding }}></View>
                        <ThemedButton
                            title="Cancel"
                            onPress={() => {
                                setDeleteModal(false)
                                setFocused(null)
                            }}
                            variant={'text'}
                            size={'lg'}
                        />
                    </View>
                </View>
            </CustomModal>
        </>
    )
}

export default editCustomData

const styles = StyleSheet.create({})
