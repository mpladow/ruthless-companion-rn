import { AnimatedFlatList, ThemedText } from '@/components'
import CharacterCard from '@/components/features/CharacterCard/CharacterCard'
import ExpandIcon from '@/components/features/CharacterCard/components/ExpandIcon'
import PageContainer from '@/components/PageContainer/PageContainer'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import ThemedContainer from '@/components/ThemedContainer'
import { updatePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
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

    //  useEffect(() => {
    //      const unsubscribe = navigation.addListener('blur', () => {
    //          if (posse) {
    //              const result = confirm('Are you sure you want to leave? Your changes will not be saved.')
    //              if (result) {
    //                  dispatch(updatePosse(posse))
    //              }
    //          }
    //      })
    //      unsubscribe();
    //      return () => {
    //          unsubscribe()
    //      }
    //  }, [])

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
    const [collapsedView, setCollapsedView] = useState(true)
    const handleCollapseAll = () => {
        console.log('🚀 ~ handleCollapseAll ~ d:', collapsedView)
        setCollapsedView(!collapsedView)
    }

    const handleAddMembersPress = () => {
        router.navigate(`../(characterEditor)/${posse?.posseId}`)
    }
    return (
        <PageContainer paddingHorizontal="none" paddingVertical="lg" fullScreenWidth={'50%'}>
            <ThemedContainer paddingSize="none" style={{ flex: 1 }}>
                {posse?.members?.length > 0 && (
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
                    //   ListHeaderComponent={
                    //       <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: padding }}>
                    //           <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    //               <ExpandedIndicator isExpanded={!collapsedView} onPress={handleCollapseAll} />
                    //               <ThemedButton
                    //                   title={collapsedView ? 'Expand All' : 'Collapse All'}
                    //                   onPress={handleCollapseAll}
                    //                   size={'sm'}
                    //                   variant="text"
                    //               />
                    //           </View>
                    //       </View>
                    //   }
                    data={posse?.members}
                    contentContainerStyle={{ paddingBottom: bottom - 150, paddingHorizontal: padding * 3, flexGrow: 1 }}
                    style={{ flexGrow: 1 }}
                    ListFooterComponent={() => <View style={{ height: 100 }}></View>}
                    ItemSeparatorComponent={() => <View style={{ height: margin }}></View>}
                    renderItem={({ item }) => <CharacterCard collapsedView={collapsedView} playerCharacter={item} />}
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
            </ThemedContainer>
        </PageContainer>
    )
}

export default PosseCharacters

const styles = StyleSheet.create({})
