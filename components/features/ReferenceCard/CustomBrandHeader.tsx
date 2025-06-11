import { ThemedText } from '@/components'
import { useTheme } from '@/theme/ThemeProvider'
import { margin, padding } from '@/theme/constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, LayoutChangeEvent, Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CustomBrandHeader = ({
    isHeading: isHeading,
    scrollPos,
    onHeightChange,
    subheadingComponent,
}: {
    isHeading?: boolean
    onHeightChange?: (height: number) => void
    scrollPos?: SharedValue<number>
    subheadingComponent?: React.ReactNode
}) => {
    const { currentTheme } = useTheme()
    const HEADINGFONTSIZE = 44
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout
        onHeightChange && onHeightChange(height)
    }

    const titleAnimatedStyles = (fadeIn: boolean) =>
        useAnimatedStyle(() => {
            const outputRange = fadeIn ? [0, 1] : [1, 0]
            const opacity = interpolate(scrollPos?.value, [0, 80], outputRange)
            return { opacity }
        }, [scrollPos])

    const settingsAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(scrollPos?.value, [0, 400], [0, -320 * -1], Extrapolation.CLAMP),
                },
            ],
        }
    }, [scrollPos])

    const imageAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(scrollPos?.value, [0, 400], [0, 170], Extrapolation.CLAMP),
                },
            ],
        }
    }, [scrollPos])

    return (
        <>
            <View
                style={[
                    {
                        flexDirection: 'column',
                        overflow: 'hidden',
                        width: '100%',
                        backgroundColor: currentTheme.colors.primary,
                        borderWidth: 4,
                        borderColor: currentTheme.colors.textDefault,
                    },
                    isHeading && {
                        borderWidth: 0,
                        paddingLeft: padding,
                        borderBottomWidth: 4,
                    },
                ]}>
                <Animated.View
                    onLayout={handleLayout}
                    style={[
                        {
                            width: '100%',
                            borderWidth: 4,
                            borderColor: currentTheme.colors.textDefault,
                            flexDirection: 'row',
                            overflow: 'hidden',
                            zIndex: 5,
                        },
                        isHeading && {
                            paddingTop: insets.top * 3,
                            borderWidth: 0,
                            paddingLeft: padding,
                        },
                    ]}>
                    <Animated.View
                        style={[
                            { flexDirection: 'row', flex: 1, alignItems: 'center' },
                            isHeading && titleAnimatedStyles(false),
                        ]}>
                        <View
                            style={{
                                marginTop: margin,
                                padding: padding * 2,
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                            }}>
                            <ThemedText.Heading
                                headingSize="h1"
                                inverted
                                style={{
                                    fontSize: Platform.OS == 'ios'?  HEADINGFONTSIZE + 32 : HEADINGFONTSIZE + 40,
                                    lineHeight: HEADINGFONTSIZE + 32,
                                    textTransform: 'uppercase',
                                }}>
                                R
                            </ThemedText.Heading>
                            <View>
                                <ThemedText.Heading
                                    headingSize="h1"
                                    inverted
                                    style={{
                                        fontSize: HEADINGFONTSIZE,
                                        lineHeight: HEADINGFONTSIZE,
                                        textTransform: 'uppercase',
                                    }}>
                                    uthless
                                </ThemedText.Heading>
                                <ThemedText.Heading
                                    inverted
                                    headingSize="h3"
                                    style={{
                                        paddingLeft: padding,
                                        textTransform: 'uppercase',
                                        fontSize: 11,
                                        lineHeight: 11,
                                    }}>
                                    The Fastest Rules in the West
                                </ThemedText.Heading>
                            </View>
                        </View>
                    </Animated.View>
                    {/* <Animated.View
                        style={[
                            isHeading && titleAnimatedStyles(true),
                            {
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                left: padding * 3,
                                right: 0,
                                top: -insets.top * 4 + padding * 2,
                                bottom: 0,
                                zIndex: 2,
                            },
                        ]}>
                        <ThemedText.Heading inverted headingSize="h1">
                            Ruthless
                        </ThemedText.Heading>
                    </Animated.View> */}
                    {!isHeading && (
                        <View>
                            <View
                                style={{
                                    overflow: 'hidden',
                                    width: 50,
                                    height: 100,
                                    flexDirection: 'row',
                                    // backgroundColor: currentTheme.colors.searchBg,
                                }}>
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        width: 50,
                                        height: 100,
                                        marginBottom: -10,
                                    }}>
                                    {/* <Image
                                        source={require('../../../assets/images/cowboy-sharper3.png')}
                                        style={{ height: 100, width: 50, marginBottom: -10 }}
                                    /> */}
                                </View>
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        width: 50,
                                        height: 100,
                                        marginBottom: -10,
                                    }}>
                                    <Image
                                        source={require('../../../assets/images/cowboy-f-rev.png')}
                                        style={{ height: 100, width: 500, marginBottom: -10 }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Animated.View>
                {isHeading && (
                    <Animated.View
                        style={[
                            isHeading && titleAnimatedStyles(true),
                            {
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                left: padding * 3,
                                right: 0,
                                //   top: -insets.top,
                                bottom: insets.top / 2,
                                zIndex: 2,
                            },
                        ]}>
                        <ThemedText.Heading inverted headingSize="h1">
                            Ruthless
                        </ThemedText.Heading>
                    </Animated.View>
                )}
                {isHeading && (
                    <Animated.View
                        style={[
                            {
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                position: 'absolute',
                                right: padding * 2,
                                top: insets.top * 2,
                                zIndex: 10,
                                //   bottom: insets.top / 2,
                            },
                            settingsAnimatedStyles,
                        ]}>
                        <Pressable onPress={() => router.navigate('/(settings)')}>
                            <Ionicons name="settings-outline" size={24} color={currentTheme.colors.textInverted} />
                        </Pressable>
                    </Animated.View>
                )}

                <Animated.Image
                    source={require('../../../assets/images/cowboy-m-rev.png')}
                    style={[isHeading ? styles.headingImage : styles.headingSmall, imageAnimatedStyles]}
                />
                <Animated.View style={isHeading && titleAnimatedStyles(false)}>{subheadingComponent}</Animated.View>
            </View>
        </>
    )
}

export default CustomBrandHeader

const styles = StyleSheet.create({
    headingImage: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginBottom: -50,
        width: 200,
        height: 300,
    },
    headingSmall: {
        position: 'absolute',
        right: 0,
        bottom: -50,
        marginBottom: -50,
        width: 100,
        height: 200,
    },
})
