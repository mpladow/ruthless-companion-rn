import { AnimatedFlatList, ThemedText } from '@/components'
import Checkbox from '@/components/Checkbox/Checkbox'
import CharacterCardReadOnly from '@/components/features/CharacterCard/CharacterCardReadOnly'
import CustomModal from '@/components/Modal/CustomModal'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { DODGE_CITY_SCENARIO } from '@/data/Pregenerated'
import { PlayerCharacter } from '@/models/playerCharacter'
import { addCharacterToPosseMembers } from '@/state/posse/posseSlice'
import { AppDispatch } from '@/state/store'
import { margin } from '@/theme/constants'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

const PreselectedCharacters = () => {
    const pregeneratedCharacters: PlayerCharacter[] = DODGE_CITY_SCENARIO
    const { bottom } = useSafeAreaInsets()
    const [charactersToAdd, setCharactersToAdd] = useState<string[]>([])
    const dispatch = useDispatch<AppDispatch>()
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
        console.log('🚀 ~ handleAddToPosse ~ characters:', characters)
        dispatch(addCharacterToPosseMembers(characters))
        setTimeout(() => {
            setLoading(false)
            router.replace('/(tabs)/(posse)/posseCharacters')
        }, 1000)
    }
    return (
        // pregenerated characters
        <PageContainer paddingSize="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
            <AnimatedFlatList
                data={pregeneratedCharacters}
                contentContainerStyle={{ paddingBottom: bottom - 150 }}
                style={{ flex: 1 }}
                ListFooterComponent={() => <View style={{ height: 100 }}></View>}
                ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                renderItem={({ item }) => (
                    <Pressable onPress={(val) => handleCheckPress(item.playerCharacterId)}>
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
                keyExtractor={(index) => String(index)}
            />
            {charactersToAdd.length > 0 && (
                <Animated.View
                    entering={Platform.OS !== 'web' ? SlideInDown : undefined}
                    style={{ position: 'absolute', bottom: insets.bottom * 2, right: margin, width: '100%' }}>
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
