import { AnimatedFlatList } from '@/components'
import CharacterCard from '@/components/features/CharacterCard/CharacterCard'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedContainer from '@/components/ThemedContainer'
import { updatePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

const PosseCharacters = () => {
    const posse = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.selectedPosse : null
    })
    const router = useRouter()
    const navigation = useNavigation()
    const dispatch = useDispatch<AppDispatch>()
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
        })
    }, [navigation])

    const { bottom } = useSafeAreaInsets()
    const { currentTheme } = useTheme()

    const handleListItemPress = () => {}
    return (
        <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
            <ThemedContainer paddingSize="none" style={{ flex: 1 }}>
                <AnimatedFlatList
                    data={posse.members}
                    contentContainerStyle={{ paddingBottom: bottom - 150 }}
                    style={{ flex: 1 }}
                    ListFooterComponent={() => <View style={{ height: 100 }}></View>}
                    ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                    renderItem={({ item }) => <CharacterCard playerCharacter={item} />}
                    keyExtractor={(index) => String(index)}
                />
            </ThemedContainer>
        </PageContainer>
    )
}

export default PosseCharacters

const styles = StyleSheet.create({})
