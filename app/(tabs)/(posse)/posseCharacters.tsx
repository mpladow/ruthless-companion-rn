import { AnimatedFlatList, HealthBarContainer, ThemedText } from '@/components'
import WeaponContainer from '@/components/features/Weapons/WeaponContainer'
import PageContainer from '@/components/PageContainer/PageContainer'
import StyledSafeAreaView from '@/components/StyledSafeAreaView'
import ThemedContainer from '@/components/ThemedContainer'
import { RootState } from '@/state/state'
import { borderRadius, borderWidth, margin, padding } from '@/theme/constants'
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
                        renderItem={({ item }) => (
                            <ThemedContainer
                                style={{
                                    borderWidth: borderWidth + 1,
                                    borderRadius: borderRadius / 2,
                                    overflow: 'hidden',
                                }}>
                                {/* Heading */}
                                <View
                                    style={{
                                        backgroundColor: currentTheme.colors.primary,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: padding * 2,
                                        borderBottomWidth: borderWidth + 1,
                                    }}>
                                    <View>
                                        <ThemedText.Heading headingSize="h2" inverted>
                                            {item.name}
                                        </ThemedText.Heading>
                                    </View>
                                    <View>
                                        <ThemedText.Heading headingSize="h2" inverted>
                                            {item.toughness}
                                        </ThemedText.Heading>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: currentTheme.colors.background,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: padding,
                                    }}>
                                    <WeaponContainer weapon={item.currentWeapon} />
                                    <HealthBarContainer bodyParts={item.bodyParts} />
                                </View>
                            </ThemedContainer>
                        )}
                        keyExtractor={(index) => String(index)}
                    />
                </ThemedContainer>
            </PageContainer>
        </StyledSafeAreaView>
    )
}

export default PosseCharacters

const styles = StyleSheet.create({})
