import { AnimatedFlatList, ThemedText } from '@/components'
import PosseListItemV2 from '@/components/features/Posse/PosseListItemV2'
import Messagebox from '@/components/Messagebox/Messagebox'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import { DUMMY_DATA } from '@/data/dummy_posse'
import { useResponsiveWidth } from '@/hooks'
import { setCurrentPosse } from '@/state/posse/posseSlice'
import { deletePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : [DUMMY_DATA]
    })
    //  const posses = [DUMMY_DATA]
    const { currentTheme } = useTheme()
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [focusedId, setFocusedId] = useState<string | null>(null)
    const { height } = Dimensions.get('window')
    const { bottom } = useSafeAreaInsets()
    const width = useResponsiveWidth()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        console.log('🚀 ~ Setting current posse to null')
        dispatch(setCurrentPosse(undefined))
    }, [])

    const handleDeletePosseConfirm = () => {
        if (focusedId) {
            setConfirmModalOpen(false)
            setFocusedId(null)
            dispatch(deletePosse(focusedId))
        } else {
            console.warn('No posse ID focused for deletion.')
        }
    }

    const handleEditPosse = () => {}
    const handleCreatePossePress = () => {
        router.navigate('../../posseEditor')
    }
    const handleEditPoseePress = (posseId: string) => {
        router.navigate('../../posseEditor/[posseId]')
    }
    const handleListItemPress = (posseId: string) => {
        console.log(`OPENING ${posseId}`)
        // findPosse
        const selectedPosse = posses.find((x) => x.posseId == posseId)
        if (selectedPosse) {
            dispatch(setCurrentPosse(selectedPosse))
        }
        router.navigate('/posseCharacters')
    }
    const [name, setName] = useState('')
    const handleOnAddMemberPress = (posseId: string) => {
        const foundPosse = posses.find((x) => x.posseId == posseId)
        if (foundPosse) {
            dispatch(setCurrentPosse(foundPosse))
            router.navigate(`/(tabs)/(posse)/(characterEditor)`)
        }
    }

    return (
        <>
            <PageContainer paddingSize="none" paddingVertical="lg" fullScreenWidth={'50%'}>
                <ThemedContainer paddingHorizontal="sm">
                    <Messagebox type={'warning'} viewStyle={{ marginBottom: margin * 2 }}>
                        <ThemedText.Text type="semibold">Choose your posse to begin!</ThemedText.Text>
                    </Messagebox>
                </ThemedContainer>
                <ThemedContainer paddingSize="none" style={{ flex: 1 }}>
                    <AnimatedFlatList
                        data={posses}
                        contentContainerStyle={{ paddingBottom: bottom + 150, paddingHorizontal: padding * 3 }}
                        style={{ flex: 1 }}
                        ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                        renderItem={({ item }) => (
                            <PosseListItemV2
                                item={item}
                                onListItemPress={handleListItemPress}
                                onDeletePossePress={(posseId: string) => {
                                    console.log('🚀 ~ Home ~ posseId:', posseId)
                                    setFocusedId(posseId)
                                    setConfirmModalOpen(true)
                                }}
                                onEditPossePress={() => handleEditPoseePress(item.posseId)}
                                onAddMemberPress={handleOnAddMemberPress}
                            />
                        )}
                        ListFooterComponent={() => (
                            <View style={{ padding: padding * 3 }}>
                                <ThemedButton
                                    alternateTitle
                                    title={'Add New Posse'}
                                    onPress={() => {
                                        console.log('dispatching create posse')
                                        handleCreatePossePress()
                                    }}
                                    size={'lg'}
                                    variant="ghost"
                                />
                            </View>
                        )}
                        keyExtractor={(index) => String(index)}
                    />
                </ThemedContainer>
            </PageContainer>

            <CustomModal
                visible={confirmModalOpen}
                onClose={() => {
                    setConfirmModalOpen(false)
                    setFocusedId(null)
                }}>
                <View>
                    <View style={{ padding: padding * 2, paddingBottom: padding * 6 }}>
                        <ThemedText.Text>Are you sure you want to delete this posse?</ThemedText.Text>
                    </View>
                    <View>
                        <ThemedButton title="Delete Posse" onPress={handleDeletePosseConfirm} size={'lg'} />
                        <View style={{ height: padding }}></View>
                        <ThemedButton
                            title="Cancel"
                            onPress={() => {
                                setConfirmModalOpen(false)
                                setFocusedId(null)
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

export default Home

const styles = StyleSheet.create({})
