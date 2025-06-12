import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export type ExpandedIndicatorType = {
    isExpanded: boolean
    onPress: () => void
}
const ExpandedIndicator = ({ isExpanded, onPress }: ExpandedIndicatorType) => {
    const { currentTheme } = useTheme()
    const rotation = useSharedValue(isExpanded ? 0 : 180) //  either true or false

    useEffect(() => {
        rotation.value = withTiming(isExpanded ? 1 : 0)
        //   handleOnPress()
    }, [isExpanded])

    const animatedStyle = useAnimatedStyle(() => {
        const spin = interpolate(rotation.value, [0, 1], [0, 180])
        return { transform: [{ rotate: `${spin}deg` }] }
    })
    const handleOnPress = () => {
        onPress()
    }

    return (
        <Pressable onPress={handleOnPress}>
            <Animated.View style={[animatedStyle]}>
                <Entypo name="chevron-down" size={24} color={currentTheme.colors.textDefault} />
            </Animated.View>
        </Pressable>
    )
}

export default ExpandedIndicator