import { ThemedText } from '@/components'
import commonStyles from '@/constants/styles'
import { borderRadius, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { Pressable, PressableProps, StyleSheet } from 'react-native'

type ButtonLargeProps = {
    onPress: () => void
    title: string
    subtitle?: string
    color?: string
    invertText?: boolean
} & PressableProps
const ButtonLarge = ({ onPress, title, subtitle, color, invertText, ...rest }: ButtonLargeProps) => {
    const { currentTheme } = useTheme()
    return (
        <Pressable
            onPress={onPress}
            style={[
                commonStyles.boxShadow,
                {
                    padding: padding * 3,
                    borderWidth: 3,
                    borderColor: color,
                    borderRadius: borderRadius,
                    backgroundColor: color,
                    alignItems: 'center',
                    paddingVertical: padding * 6,
                    width: '100%',
                },
            ]}
            {...rest}>
            <ThemedText.Heading headingSize="h1" inverted={invertText}>
                {title}
            </ThemedText.Heading>
            <ThemedText.Text size="xs" inverted={invertText}>
                {subtitle}
            </ThemedText.Text>
        </Pressable>
    )
}

export default ButtonLarge

const styles = StyleSheet.create({})
