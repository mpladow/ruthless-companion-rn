import { AnimatedFlatList } from '@/components'
import CharacterCard from '@/components/features/CharacterCard/CharacterCard'
import PageContainer from '@/components/PageContainer/PageContainer'
import { DODGE_CITY_SCENARIO } from '@/data/Pregenerated'
import { PlayerCharacter } from '@/models/playerCharacter'
import { margin } from '@/theme/constants'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PreselectedCharacters = () => {
    const pregeneratedCharacters: PlayerCharacter[] = DODGE_CITY_SCENARIO
    const { bottom } = useSafeAreaInsets()
    return (
        // pregenerated characters
        <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
            <AnimatedFlatList
                data={pregeneratedCharacters}
                contentContainerStyle={{ paddingBottom: bottom - 150 }}
                style={{ flex: 1 }}
                ListFooterComponent={() => <View style={{ height: 100 }}></View>}
                ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                renderItem={({ item }) => <CharacterCard playerCharacter={item} />}
                keyExtractor={(index) => String(index)}
            />
        </PageContainer>
    )
}

export default PreselectedCharacters

const styles = StyleSheet.create({})
