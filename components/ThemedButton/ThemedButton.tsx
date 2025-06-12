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
    variant?: 'ghost' | 'text' | 'filled' | 'icon'
    alternateTitle?: boolean
    size: 'sm' | 'lg'
    loading?: boolean
} & PressableProps

const ThemedButton: React.FC<ThemedButtonProps> = ({
    title,
    onPress,
    alternateTitle,
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
                    backgroundColor: currentTheme.colors.background,
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
            case 'icon':
                return {
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    textColor: currentType.backgroundColor,
                    borderColor: currentType.backgroundColor,
                    paddingHorizontal: 4,
                    borderWidth: 0,
                }
            default:
                return commonStyles.boxShadow
        }
    }, [variant, type])

    return (
        <Pressable
            hitSlop={variant == 'icon' ? 8 : 12}
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: pressed ? currentType.pressedColor : currentType.backgroundColor },
                disabled && styles.disabled,
                size == 'sm' ? styles.buttonSmall : styles.buttonLarge,
                variant == 'text' && {
                    backgroundColor: 'transparent',
                    padding: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                currentVariantStyles,
                style,
            ]}
            {...rest}>
            {typeof title == 'string' ? (
                alternateTitle ? (
                    <ThemedText.Heading
                        headingSize={size == 'sm' ? 'h3' : 'h2'}
                        type="bold"
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
                    </ThemedText.Heading>
                ) : (
                    <ThemedText.Text
                        type="bold"
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
                )
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
