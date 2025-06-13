import Bullet from '@/components/Icons/Bullet'
import { borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Color from 'color'
import * as Haptics from 'expo-haptics'
import React, { memo, useEffect } from 'react'
import { Platform, Pressable, StyleSheet, ViewProps } from 'react-native'
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type AmmoCheckboxProps = {
    onPress: () => void
    isChecked: boolean
    style?: ViewProps['style']
    boxSize: 'sm' | 'lg'
}
const AmmoCheckbox = memo(({ onPress, style, isChecked, boxSize }: AmmoCheckboxProps) => {
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
    const handleAmmoPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        //   opacity.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) })
        //   translateY.value = withTiming(-50, { duration: 500, easing: Easing.out(Easing.ease) })
        onPress()
    }

    return (
        <Pressable onPress={handleAmmoPress}>
            <Animated.View
                style={[
                    {
                        width: DIMENSIONS,
                        height: DIMENSIONS,
                        borderWidth: borderWidth + 1,
                        borderRadius: 6,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    style,
                ]}>
                {isChecked ? (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            height: DIMENSIONS,
                            width: DIMENSIONS,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Color(currentTheme.colors.grey0).lighten(0.3).hex(),
                        }}>
                        <Animated.View
                            entering={Platform.OS !== 'web' ? FadeInDown : undefined}
                            style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesome name="times" size={28} color={currentTheme.colors.greyOutline} />
                        </Animated.View>
                    </Animated.View>
                ) : (
                    <Animated.View
                        entering={Platform.OS !== 'web' ? FadeInDown : undefined}
                        style={[
                            animatedStyle,
                            {
                                position: 'absolute',
                                left: 1,
                                top: 1,
                                height: DIMENSIONS - padding * 2,
                                width: DIMENSIONS - padding * 2,
                                padding: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}>
                        <Bullet fill={currentTheme.colors.warning} />
                        {/* <ThemedText.Text>X</ThemedText.Text> */}
                    </Animated.View>
                )}
            </Animated.View>
        </Pressable>
    )
})

export default AmmoCheckbox

const styles = StyleSheet.create({})
