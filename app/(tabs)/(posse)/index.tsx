import { ThemedText } from '@/components'
import PosseListItemV2 from '@/components/features/Posse/PosseListItemV2'
import CustomBrandHeader from '@/components/features/ReferenceCard/CustomBrandHeader'
import CustomModal from '@/components/Modal/CustomModal'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { DUMMY_DATA } from '@/data/dummy_posse'
import { setCurrentPosse } from '@/state/posse/posseSlice'
import { deletePosse } from '@/state/posse/userPossesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation, useRouter } from 'expo-router'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const posses = useSelector((state: RootState) => {
        return state._persist.rehydrated ? state.userPosses : [DUMMY_DATA]
    })
    //  const posses = [DUMMY_DATA]
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [focusedId, setFocusedId] = useState<string | null>(null)
    const [headerHeight, setHeaderHeight] = useState(0)

    const scrollY = useSharedValue(0)

    const { currentTheme } = useTheme()
    const { bottom, top } = useSafeAreaInsets()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()

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

    const handleCreatePossePress = () => {
        router.navigate('../../posseEditor')
    }
    const handleEditPossePress = (posseId: string) => {
        router.navigate(`../../posseEditor/${posseId}`)
    }
    const handleListItemPress = (posseId: string) => {
        // findPosse
        const selectedPosse = posses.find((x) => x.posseId == posseId)
        if (selectedPosse) {
            dispatch(setCurrentPosse(selectedPosse))
        }
        router.navigate(`./${selectedPosse?.posseId}`)
    }
    const handleOnAddMemberPress = (posseId: string) => {
        const foundPosse = posses.find((x) => x.posseId == posseId)
        if (foundPosse) {
            dispatch(setCurrentPosse(foundPosse))
            router.navigate(`../(characterEditor)/${foundPosse.posseId}`)
        }
    }

    // handle scrolling of scrollview
    const handleScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y
    })

    const handleChildHeightChange = (height: number) => {
        setHeaderHeight(height)
    }

    const scrollAnimatedStyles = useAnimatedStyle(() => {
        const translateY = interpolate(scrollY.value, [0, 200], [0, -headerHeight + top + 60], Extrapolation.CLAMP)
        return { transform: [{ translateY }] }
    }, [headerHeight, scrollY.value])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => {
                return (
                    <View
                        style={{
                            width: '100%',
                            height: 80,
                            paddingTop: Platform.OS === 'ios' ? 24 : 0,
                            position: 'absolute',
                            alignItems: 'flex-end',
                            right: padding * 3,
                            paddingBottom: Platform.OS === 'android' ? margin : 0,
                            justifyContent: 'flex-end',
                        }}>
                        <Pressable onPress={() => router.navigate('/(settings)')} hitSlop={24}>
                            <Ionicons name="settings-outline" size={24} color={currentTheme.colors.textInverted} />
                        </Pressable>
                    </View>
                )
            },
        })
    })
    return (
        <View style={{ flexGrow: 1, backgroundColor: currentTheme.colors.background }}>
            <Animated.View style={[scrollAnimatedStyles, { flexGrow: 1 }]}>
                <CustomBrandHeader
                    isHeading
                    scrollPos={scrollY}
                    onHeightChange={handleChildHeightChange}
                    //   subheadingComponent={
                    //       posses.length === 0 ? (
                    //           <View style={{ paddingHorizontal: padding * 2 }}>
                    //               <Messagebox type={'warning'} viewStyle={{ marginBottom: margin * 2 }}>
                    //                   <View style={{ flexDirection: 'row', alignItems: 'center', gap: padding }}>
                    //                       <View style={{ height: 24, width: 24 }}>
                    //                           <FingerPointing fill={currentTheme.colors.textDefault} />
                    //                       </View>
                    //                       <ThemedText.Text type="semibold">Create a posse to begin!</ThemedText.Text>
                    //                   </View>
                    //               </Messagebox>
                    //           </View>
                    //       ) : (
                    //           <View style={{ paddingHorizontal: padding * 2 }}>
                    //               <Messagebox
                    //                   type={'warning'}
                    //                   viewStyle={{ marginBottom: margin * 2, paddingHorizontal: padding * 2 }}>
                    //                   <View style={{ flexDirection: 'row', alignItems: 'center', gap: padding }}>
                    //                       <View style={{ height: 24, width: 24 }}>
                    //                           <FingerPointing fill={currentTheme.colors.textDefault} />
                    //                       </View>
                    //                       <ThemedText.Text type="semibold">Choose your posse to begin!</ThemedText.Text>
                    //                   </View>
                    //               </Messagebox>
                    //           </View>
                    //       )
                    //   }
                />
                <Animated.ScrollView
                    decelerationRate={0.9}
                    onScroll={handleScroll}
                    style={{
                        flex: 1,
                        backgroundColor: currentTheme.colors.background,
                        paddingVertical: 4,
                        zIndex: 999,
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: padding * 2,
                        paddingBottom: bottom * 3,
                    }}>
                    {posses.length === 0 && (
                        <View
                            style={{
                                padding: padding * 3,
                                alignItems: 'center',
                                flexGrow: 1,
                                justifyContent: 'center',
                            }}>
                            <Image
                                source={require('../../../assets/images/tumbleweed.png')}
                                style={{ width: 100, height: 100 }}
                            />
                            <ThemedText.Text style={{ marginVertical: padding * 4 }}>
                                You have no created posses.
                            </ThemedText.Text>
                            <ThemedButton
                                title={'Create a Posse'}
                                onPress={() => {
                                    handleCreatePossePress()
                                }}
                                size={'lg'}
                                type="primary"
                                variant="filled"
                            />
                        </View>
                    )}
                    {posses.map((item) => (
                        <Fragment key={item.posseId}>
                            <PosseListItemV2
                                key={item.posseId}
                                item={item}
                                onListItemPress={handleListItemPress}
                                onDeletePossePress={(posseId: string) => {
                                    setFocusedId(posseId)
                                    setConfirmModalOpen(true)
                                }}
                                onEditPossePress={() => handleEditPossePress(item.posseId)}
                                onAddMemberPress={handleOnAddMemberPress}
                            />
                            <View style={{ height: margin }}></View>
                            {posses.length > 0 && item.posseId === posses[posses.length - 1].posseId && (
                                <View style={{ padding: padding * 3, alignItems: 'center' }}>
                                    <ThemedButton
                                        title={'Add New Posse'}
                                        onPress={() => {
                                            handleCreatePossePress()
                                        }}
                                        size={'lg'}
                                        variant="ghost"
                                    />
                                </View>
                            )}
                        </Fragment>
                    ))}
                </Animated.ScrollView>
            </Animated.View>

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
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
