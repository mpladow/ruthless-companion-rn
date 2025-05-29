import Bullet from '@/components/Icons/Bullet'
import { borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Color from 'color'
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
                    },
                    style,
                ]}>
                {isChecked ? (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            height: DIMENSIONS - padding,
                            width: DIMENSIONS - padding,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Color(currentTheme.colors.grey0).lighten(0.3).hex(),
                        }}>
                        <Animated.View entering={Platform.OS !== 'web' ? FadeInDown : undefined}>
                            <FontAwesome name="times" size={32} color={currentTheme.colors.grey0} />
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
