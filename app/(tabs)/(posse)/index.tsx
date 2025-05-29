import { AnimatedFlatList, ThemedBottomSheet, ThemedText } from '@/components'
import PosseListItem from '@/components/features/Posse/PosseListItem'
import PageContainer from '@/components/PageContainer/PageContainer'
import StyledSafeAreaView from '@/components/StyledSafeAreaView'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import { DUMMY_DATA } from '@/data/dummy_posse'
import { useResponsiveWidth } from '@/hooks'
import { PosseForm } from '@/models/forms/posseForm'
import { setCurrentPosse } from '@/state/posse/posseSlice'
import { createPosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin } from '@/theme/constants'
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
    const { height } = Dimensions.get('window')
    const { bottom } = useSafeAreaInsets()
    const width = useResponsiveWidth()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const handleDeletePosseConfirm = () => {}
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
        <StyledSafeAreaView>
            <PageContainer paddingSize="sm" fullScreenWidth={'50%'}>
                <View style={{ position: 'absolute', bottom: 100, right: 20, zIndex: 1000 }}>
                    <ThemedButton
                        variant="primary"
                        title={'Add Test Posse'}
                        onPress={() => {
                            handleCreatePosseTEST()
                        }}
                        size={'sm'}></ThemedButton>
                </View>
                <ThemedContainer paddingSize="none" style={{ marginVertical: margin, flex: 1 }}>
                    <AnimatedFlatList
                        data={posses}
                        contentContainerStyle={{ paddingBottom: bottom - 150 }}
                        style={{ flex: 1 }}
                        ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                        renderItem={({ item }) => <PosseListItem item={item} onListItemPress={handleListItemPress} />}
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
						  <TextInput/>
                </View>
            </ThemedBottomSheet>
        </StyledSafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
