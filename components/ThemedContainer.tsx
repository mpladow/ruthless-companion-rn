import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export type PaddingStandardTypes = 'none' | 'sm' | 'lg'
export type ThemedContainerProps = {
    paddingSize?: PaddingStandardTypes
    paddingVertical?: PaddingStandardTypes
    paddingHorizontal?: PaddingStandardTypes
} & ViewProps
const ThemedContainer = ({
    paddingSize,
    paddingVertical,
    paddingHorizontal,
    children,
    style,
}: ThemedContainerProps) => {
    const { currentTheme } = useTheme()

    const containerPadding = useMemo(() => {
        switch (paddingSize) {
            case 'none':
                return 0
            case 'sm':
                return padding * 4
            case 'lg':
                return padding * 8

            default:
                return 0
        }
    }, [paddingSize])
    const containerPaddingVertical = useMemo(() => {
        switch (paddingVertical) {
            case 'none':
                return 0
            case 'sm':
                return padding * 4
            case 'lg':
                return padding * 8

            default:
                return 0
        }
    }, [paddingVertical])

    const containerPaddingHorizontal = useMemo(() => {
        switch (paddingHorizontal) {
            case 'none':
                return 0
            case 'sm':
                return padding * 4
            case 'lg':
                return padding * 8

            default:
                return 0
        }
    }, [paddingSize])
    return (
        <View
            style={[
                { backgroundColor: currentTheme.colors.background },
                paddingSize && { padding: containerPadding },
                paddingVertical && { paddingVertical: containerPaddingVertical },
                paddingHorizontal && { paddingHorizontal: containerPaddingHorizontal },
                style,
            ]}>
            {children}
        </View>
    )
}

export default ThemedContainer

const styles = StyleSheet.create({})
