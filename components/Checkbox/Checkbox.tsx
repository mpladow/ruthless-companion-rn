import { borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Color from 'color'
import React, { memo, useEffect } from 'react'
import { Platform, Pressable, StyleSheet, ViewProps } from 'react-native'
import Animated, {
	Easing,
	FadeIn,
	FadeInDown,
	FadeOut,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

type CheckboxProps = {
    onPress: (val: boolean) => void
    isChecked: boolean
    style?: ViewProps['style']
    boxSize: 'sm' | 'lg'
    isLastItem: boolean
}
const Checkbox = memo(({ onPress, style, isChecked, boxSize, isLastItem }: CheckboxProps) => {
    const DIMENSIONS = boxSize == 'lg' ? 50 : 24
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
                        entering={Platform.OS !== 'web' ? FadeIn : undefined}
                        exiting={Platform.OS !== 'web' ? FadeOut : undefined}
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
                        <Entypo name="check" size={16} color={currentTheme.colors.textDefault} />
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
                                <FontAwesome5 name="skull-crossbones" size={20} color={currentTheme.colors.grey0} />
                            )}
                        </Animated.View>
                    </Animated.View>
                )}
            </Animated.View>
        </Pressable>
    )
})

export default Checkbox

const styles = StyleSheet.create({})
