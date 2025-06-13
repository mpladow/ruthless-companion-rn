import { borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import Foundation from '@expo/vector-icons/Foundation'
import Color from 'color'
import * as Haptics from 'expo-haptics'
import React, { memo, useEffect } from 'react'
import { Platform, Pressable, StyleSheet, ViewProps } from 'react-native'
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type AmmoCheckboxProps = {
    onPress: (isHealing: boolean) => void
    isChecked: boolean
    style?: ViewProps['style']
    boxSize: 'sm' | 'lg'
    isLastItem: boolean
}
const AmmoCheckbox = memo(({ onPress, style, isChecked, boxSize, isLastItem }: AmmoCheckboxProps) => {
    const DIMENSIONS = boxSize == 'lg' ? 50 : 40
    const { currentTheme } = useTheme()

    const opacity = useSharedValue(1)
    const translateY = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                {
                    translateY: translateY.value,
                },
            ],
        }
    })
    useEffect(() => {
        if (isChecked) {
            opacity.value = withTiming(0, {
                duration: 400,
                easing: Easing.out(Easing.ease),
            })
            translateY.value = withTiming(30, {
                duration: 400,
                easing: Easing.out(Easing.ease),
            })
        } else {
            opacity.value = withTiming(1, {
                duration: 400,
                easing: Easing.out(Easing.ease),
            })
            translateY.value = withTiming(0, {
                duration: 400,
                easing: Easing.out(Easing.ease),
            })
        }
    }, [isChecked])
    const handleHealthBoxPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

        if (isLastItem) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }
        onPress(isChecked)
    }

    return (
        <Pressable onPress={handleHealthBoxPress}>
            <Animated.View
                style={[
                    {
                        width: DIMENSIONS,
                        height: DIMENSIONS,
                        borderWidth: borderWidth,
                        overflow: 'hidden',
                    },
                    isChecked && { backgroundColor: Color(currentTheme.colors.error).lighten(0.4).hex() },
                    style,
                ]}>
                {isChecked ? (
                    <Animated.View
                        entering={Platform.OS !== 'web' ? FadeInDown : undefined}
                        style={[
                            //  animatedStyle,
                            {
                                position: 'absolute',
                                left: 1,
                                top: 1,
                                height: DIMENSIONS - padding * 2,
                                width: DIMENSIONS - padding * 2,
                                //   padding: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                                //   backgroundColor: Color(currentTheme.colors.error).lighten(0.4).hex(),
                            },
                        ]}>
                        <Entypo name="drop" size={32} color={currentTheme.colors.error} />
                        {/* <ThemedText.Text>X</ThemedText.Text> */}
                    </Animated.View>
                ) : (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            height: DIMENSIONS - padding,
                            width: DIMENSIONS - padding,
                            alignItems: 'center',
                            justifyContent: 'center',
                            //  backgroundColor: Color(currentTheme.colors.grey0).lighten(0.3).hex(),
                        }}>
                        <Animated.View entering={Platform.OS !== 'web' ? FadeInDown : undefined}>
                            {isLastItem && (
                                <Foundation
                                    name="skull"
                                    size={24}
                                    color={currentTheme.colors.greyOutline}
                                />

                            )}
                        </Animated.View>
                    </Animated.View>
                )}
            </Animated.View>
        </Pressable>
    )
})

export default AmmoCheckbox

const styles = StyleSheet.create({})
