import { AnimatedFlatList, ThemedText } from '@/components'
import Checkbox from '@/components/Checkbox/Checkbox'
import CharacterCard from '@/components/features/CharacterCard/CharacterCard'
import CharacterCardReadOnly from '@/components/features/CharacterCard/CharacterCardReadOnly'
import ExpandIcon from '@/components/features/CharacterCard/components/ExpandIcon'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import CustomHeader from '@/components/ThemedHeader/ThemedHeader'
import { deleteMultipleCharacters, setCurrentPosse } from '@/state/posse/posseSlice'
import { updatePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

const PosseCharacters = () => {
    const { posseId } = useLocalSearchParams()
    const posse = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.selectedPosse : null
    })
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : []
    })
    const [collapsedView, setCollapsedView] = useState(true)
    const [openOptionsModal, setOpenOptionsModal] = useState(false)
    const [charactersToDelete, setCharactersToDelete] = useState<string[]>([])

    const router = useRouter()
    const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
    const { bottom } = useSafeAreaInsets()
    const { currentTheme } = useTheme()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (posseId) {
            const foundPosse = posses.find((x) => x.posseId == posseId)
            if (foundPosse) {
                dispatch(setCurrentPosse(foundPosse))
            }
        }
    }, [posseId])
    useEffect(() => {
        if (posse) {
            dispatch(updatePosse(posse))
        }
    }, [posse])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: posse?.name,
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            header: (x: any) => {
                const title = x.options.title || x.route.name
                return (
                    <CustomHeader
                        title={title}
                        showBack={title !== 'Home'}
                        rightComponent={
                            <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
                                <ThemedButton
                                    onPress={handleAddMembersPress}
                                    title={
                                        <View>
                                            <AntDesign name="plus" size={16} color={currentTheme.colors.textDefault} />
                                            <View style={{ position: 'absolute', right: -12, bottom: 8 }}>
                                                <Image
                                                    source={require('../../../assets/images/cowboy-sharper3.png')}
                                                    style={{ height: 24, width: 12, marginBottom: -10 }}
                                                />
                                            </View>
                                        </View>
                                    }
                                    size={'sm'}
                                    type="primary"
                                    variant="icon"
                                />
                                {posse?.members && posse?.members.length > 0 && (
                                    <ThemedButton
                                        onPress={handleEditModeToggle}
                                        title={
                                            <View>
                                                <FontAwesome
                                                    name="pencil"
                                                    size={24}
                                                    color={currentTheme.colors.textDefault}
                                                />
                                                <View style={{ position: 'absolute', right: -2, bottom: -2 }}>
                                                    {editMode ? (
                                                        <AntDesign
                                                            name="checkcircle"
                                                            size={12}
                                                            color={currentTheme.colors.success}
                                                        />
                                                    ) : null}
                                                </View>
                                            </View>
                                        }
                                        size={'sm'}
                                        type="primary"
                                        variant="icon"
                                    />
                                )}
                            </View>
                            //  <PosseCharactersButton
                            //      editMode={editMode}
                            //      onEditPress={handleEditModeToggle}
                            //      onAddMemberPress={() => handleAddMembersPress()}
                            //  />
                        }
                    />
                )
            },
        })
    }, [navigation, editMode])

    const handleCollapseAll = () => {
        setCollapsedView(!collapsedView)
    }

    const handleAddMembersPress = () => {
        router.navigate(`../(characterEditor)/${posse?.posseId}`)
    }
    const handleEditModeToggle = () => {
        setEditMode(!editMode)
    }

    const handleCheckPress = (characterId: string) => {
        const idFound = charactersToDelete.find((x) => x == characterId)
        if (idFound) {
            setCharactersToDelete(charactersToDelete.filter((x) => x != characterId))
        } else {
            setCharactersToDelete([...charactersToDelete, characterId])
        }
    }
    const [loading, setLoading] = useState(false)

    const handleDeleteFromPosse = () => {
        setLoading(true)
        dispatch(deleteMultipleCharacters(charactersToDelete.map((x) => x)))
        setCharactersToDelete([]) // Clear the selection after deletion
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }
    useEffect(() => {
        if (posse?.members.length == 0) {
            setEditMode(false)
        }
    }, [posse?.members.length])
    return (
        <PageContainer paddingHorizontal="none" paddingVertical="lg" fullScreenWidth={'50%'}>
            <ThemedContainer paddingSize="none" style={{ flex: 1 }}>
                {!editMode && posse?.members && posse?.members?.length > 0 && (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingVertical: padding,
                            position: 'absolute',
                            bottom: bottom * 2,
                            right: margin,
                            zIndex: 999,
                        }}>
                        <ThemedButton
                            title={
                                <ExpandIcon
                                    collapsedView={collapsedView}
                                    handleCollapseAll={handleCollapseAll}
                                    showText={true}
                                />
                            }
                            onPress={handleCollapseAll}
                            type="primary"
                            variant="ghost"
                            style={{ backgroundColor: currentTheme.colors.background, borderRadius: 50 }}
                            size={'sm'}
                        />
                    </View>
                )}
                <AnimatedFlatList
                    data={posse?.members ?? []}
                    contentContainerStyle={{ paddingBottom: bottom - 150, paddingHorizontal: padding * 3, flexGrow: 1 }}
                    style={{ flexGrow: 1 }}
                    ListFooterComponent={() => <View style={{ height: 130 }}></View>}
                    ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                    renderItem={({ item }) =>
                        editMode ? (
                            <Pressable onPress={(val) => handleCheckPress(item.playerCharacterId)}>
                                <View style={{ flexDirection: 'row', flexGrow: 1, width: '100%', gap: 6 }}>
                                    <View style={{ flex: 1 }}>
                                        <CharacterCardReadOnly playerCharacter={item} collapsedView={true} readOnly />
                                    </View>

                                    <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onPress={(val) => handleCheckPress(item.playerCharacterId)}
                                            isChecked={charactersToDelete.includes(item.playerCharacterId)}
                                            boxSize={'sm'}
                                            isLastItem={false}
                                        />
                                    </Animated.View>
                                </View>
                            </Pressable>
                        ) : (
                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                <View style={{ flex: 1 }}>
                                    <CharacterCard
                                        collapsedView={collapsedView}
                                        playerCharacter={item}
                                        editMode={editMode}
                                    />
                                </View>

                                {/* {editMode && (
                                    <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Checkbox
                                            onPress={(val) => handleCheckPress(item.playerCharacterId)}
                                            isChecked={charactersToDelete.includes(item.playerCharacterId)}
                                            boxSize={'sm'}
                                            isLastItem={false}
                                        />
                                    </Animated.View>
                                )} */}
                            </View>
                        )
                    }
                    keyExtractor={(index) => String(index)}
                    ListEmptyComponent={
                        <View
                            style={[
                                {
                                    flex: 1,
                                    flexGrow: 1,
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                },
                            ]}>
                            <Image
                                source={require('../../../assets/images/tumbleweed.png')}
                                style={{ width: 100, height: 100 }}
                            />
                            <View style={{ marginVertical: margin * 2, alignItems: 'center' }}>
                                <ThemedText.Heading headingSize="h2">
                                    You have no members in your posse
                                </ThemedText.Heading>
                                <ThemedText.Text>Recruit some new members now</ThemedText.Text>
                            </View>
                            <ThemedButton
                                title={'+ Add Members'}
                                onPress={() => {
                                    handleAddMembersPress()
                                }}
                                size={'lg'}
                                type="success"
                            />
                        </View>
                    }
                />
                {editMode && (
                    <Animated.View
                        entering={Platform.OS !== 'web' ? SlideInDown : undefined}
                        exiting={Platform.OS !== 'web' ? SlideOutDown : undefined}
                        style={{
                            position: 'absolute',
                            bottom: bottom * 2,
                            right: margin,
                            left: margin,
                            flexDirection: 'row',
                            flex: 1,
                            gap: 6,
                        }}>
                        <View style={{ flex: 1 }}>
                            <ThemedButton
                                title={`Cancel`}
                                onPress={handleEditModeToggle}
                                size={'lg'}
                                variant="ghost"
                                type="primary"
                            />
                        </View>
                        {charactersToDelete.length > 0 && (
                            <ThemedButton
                                title={`Delete ${charactersToDelete.length} Character${
                                    charactersToDelete.length > 1 ? 's' : ''
                                }`}
                                onPress={handleDeleteFromPosse}
                                size={'lg'}
                                type="danger"
                            />
                        )}
                    </Animated.View>
                )}
            </ThemedContainer>
            <CustomModal
                visible={openOptionsModal}
                onClose={function (): void {
                    throw new Error('Function not implemented.')
                }}
                children={undefined}
            />
        </PageContainer>
    )
}

export default PosseCharacters

const styles = StyleSheet.create({})
