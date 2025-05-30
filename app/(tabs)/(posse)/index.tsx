import { AnimatedFlatList, ThemedBottomSheet, ThemedText } from '@/components'
import PosseListItem from '@/components/features/Posse/PosseListItem'
import Messagebox from '@/components/Messagebox/Messagebox'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import { DUMMY_DATA } from '@/data/dummy_posse'
import { useResponsiveWidth } from '@/hooks'
import { PosseForm } from '@/models/forms/posseForm'
import { setCurrentPosse } from '@/state/posse/posseSlice'
import { createPosse, deletePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : [DUMMY_DATA]
    })
    //  const posses = [DUMMY_DATA]
    const { currentTheme } = useTheme()
    const [openCreatePosse, setopenCreatePosse] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [focusedId, setFocusedId] = useState<string | null>(null)
    const { height } = Dimensions.get('window')
    const { bottom } = useSafeAreaInsets()
    const width = useResponsiveWidth()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleDeletePosseConfirm = () => {
        if (focusedId) {
            console.log(`DELETING POSSE ${focusedId}`)
            // dispatch(deletePosse(focusedId))
            setConfirmModalOpen(false)
            setFocusedId(null)
            dispatch(deletePosse(focusedId))
        } else {
            console.warn('No posse ID focused for deletion.')
        }
    }

    const handleEditPosse = () => {}
    const handleCreatePosseTEST = () => {
        dispatch(createPosse({ name: 'TEST' } as PosseForm))
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
    return (
        <>
            <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
                <Messagebox type={'warning'} viewStyle={{ marginBottom: margin * 2 }}>
                    <ThemedText.Text type="semibold">Choose your posse to begin!</ThemedText.Text>
                </Messagebox>
                <ThemedContainer paddingSize="none" style={{ flex: 1 }}>
                    <AnimatedFlatList
                        data={posses}
                        contentContainerStyle={{ paddingBottom: bottom + 150 }}
                        style={{ flex: 1 }}
                        ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                        renderItem={({ item }) => (
                            <PosseListItem
                                item={item}
                                onListItemPress={handleListItemPress}
                                onDeletePossePress={(posseId: string) => {
                                    console.log('🚀 ~ Home ~ posseId:', posseId)
                                    setFocusedId(posseId)
                                    setConfirmModalOpen(true)
                                }}
                            />
                        )}
                        ListFooterComponent={() => (
                            <View style={{ padding: padding * 3 }}>
                                <ThemedButton
                                    title={'Add New Posse'}
                                    onPress={() => handleCreatePosseTEST()}
                                    size={'lg'}
                                    variant="ghost"
                                />
                            </View>
                        )}
                        keyExtractor={(index) => String(index)}
                    />
                </ThemedContainer>
            </PageContainer>

            <ThemedBottomSheet
                visible={openCreatePosse}
                onClose={() => {
                    setopenCreatePosse(false)
                }}
                allowCloseButton
                headerTitle={'Create New Posse'}>
                <View>
                    <ThemedText.Text>Name</ThemedText.Text>
                    <TextInput />
                </View>
            </ThemedBottomSheet>
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
