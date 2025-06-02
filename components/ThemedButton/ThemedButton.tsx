import commonStyles from '@/constants/styles'
import { borderRadius } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Color from 'color'
import React, { ReactElement, useMemo } from 'react'
import { Pressable, PressableProps, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { ThemedText } from '../ThemedText/ThemedText'
type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
type ThemedButtonProps = {
    title: string | ReactElement
    onPress: () => void
    disabled?: boolean
    style?: ViewStyle
    textStyle?: TextStyle
    type?: Variant
    variant?: 'ghost' | 'text' | 'filled'
    size: 'sm' | 'lg'
    loading?: boolean
} & PressableProps

const ThemedButton: React.FC<ThemedButtonProps> = ({
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
    size,
    type = 'primary',
    variant = 'filled',
    ...rest
}) => {
    const { currentTheme } = useTheme()

    const currentType = useMemo(() => {
        switch (type) {
            case 'primary':
                return {
                    backgroundColor: currentTheme.colors.primary,
                    pressedColor: Color(currentTheme.colors.primary).lighten(0.2).hex(),
                    textColor: currentTheme.colors.textInverted,
                }
            case 'secondary':
                return {
                    backgroundColor: currentTheme.colors.secondary,
                    pressedColor: Color(currentTheme.colors.secondary).lighten(0.2).hex(),
                    textColor: currentTheme.colors.textDefault,
                }
            case 'danger':
                return {
                    backgroundColor: currentTheme.colors.error,
                    pressedColor: Color(currentTheme.colors.error).lighten(0.2).hex(),
                    textColor: currentTheme.colors.textDefault,
                }
            case 'success':
                return {
                    backgroundColor: currentTheme.colors.success,
                    pressedColor: Color(currentTheme.colors.success).lighten(0.2).hex(),
                    textColor: currentTheme.colors.textDefault,
                }
            case 'warning':
                return {
                    backgroundColor: currentTheme.colors.warning,
                    pressedColor: Color(currentTheme.colors.warning).lighten(0.2).hex(),
                    textColor: currentTheme.colors.textDefault,
                }
            default:
                return {
                    backgroundColor: currentTheme.colors.primary,
                    pressedColor: Color(currentTheme.colors.primary).lighten(0.2).hex(),
                    textColor: currentTheme.colors.textInverted,
                }
        }
    }, [type])
    const currentVariantStyles = useMemo(() => {
        switch (variant) {
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    textColor: currentType.backgroundColor,
                    borderColor: currentType.backgroundColor,
                    borderWidth: 2,
                }
            case 'text':
                return {
                    backgroundColor: 'transparent',
                    textColor: currentType.backgroundColor,
                    borderColor: currentType.backgroundColor,

                    borderWidth: 0,
                }
            case 'filled':
                return commonStyles.boxShadow

            default:
                return {}
        }
    }, [variant, type])

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? currentType.pressedColor : currentType.backgroundColor },
                disabled && styles.disabled,
                size == 'sm' ? styles.buttonSmall : styles.buttonLarge,
                currentVariantStyles,
                style,
            ]}
            {...rest}>
            {typeof title == 'string' ? (
                <ThemedText.Text
                    type="semibold"
                    size={size == 'sm' ? 'xs' : 'default'}
                    style={[
                        styles.text,
                        size == 'sm' && { lineHeight: 16 },

                        { color: currentType.textColor },
                        (variant == 'ghost' || variant == 'text') && {
                            color: currentVariantStyles.textColor,
                        },
                    ]}>
                    {title}
                </ThemedText.Text>
            ) : (
                title
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSmall: {
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    buttonLarge: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    disabled: {
        opacity: 0.6,
    },
})

export default ThemedButton
