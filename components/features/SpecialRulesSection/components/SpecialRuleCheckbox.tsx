import { borderRadius, borderWidth, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Color from 'color'
import React, { memo } from 'react'
import { Platform, Pressable, StyleSheet, ViewProps } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

type SpecialRuleCheckboxProps = {
    onPress: (isHealing: boolean) => void
    isChecked: boolean
    style?: ViewProps['style']
    boxSize: 'sm' | 'lg'
    isLastItem: boolean
}
const SpecialRuleCheckbox = memo(({ onPress, style, isChecked, boxSize, isLastItem }: SpecialRuleCheckboxProps) => {
    const DIMENSIONS = boxSize == 'lg' ? 50 : 30
    const { currentTheme } = useTheme()

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
                        borderRadius: borderRadius / 3,
                        overflow: 'hidden',
                    },
                    isChecked && { backgroundColor: Color(currentTheme.colors.success).lighten(0.4).hex() },
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
                        <AntDesign name="check" size={24} color={currentTheme.colors.success} />
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

export default SpecialRuleCheckbox

const styles = StyleSheet.create({})
