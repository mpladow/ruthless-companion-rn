import { AnimatedFlatList } from '@/components'
import CharacterCard from '@/components/features/CharacterCard/CharacterCard'
import PageContainer from '@/components/PageContainer/PageContainer'
import StyledSafeAreaView from '@/components/StyledSafeAreaView'
import ThemedContainer from '@/components/ThemedContainer'
import { RootState } from '@/state/state'
import { margin } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

const PosseCharacters = () => {
    const posse = useSelector((state: RootState) => {
        return state.selectedPosse
    })
    console.log('🚀 ~ posse ~ posse:', posse)
    const { bottom } = useSafeAreaInsets()
    const { currentTheme } = useTheme()

    const handleListItemPress = () => {}
    return (
        <StyledSafeAreaView>
            <PageContainer fullScreenWidth={'50%'} paddingSize="sm">
                <ThemedContainer paddingSize="none" style={{ marginVertical: margin, flex: 1 }}>
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
        </StyledSafeAreaView>
    )
}

export default PosseCharacters

const styles = StyleSheet.create({})
