import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export type ThemedContainerProps = {
    paddingSize?: 'sm' | 'lg'
} & ViewProps
const ThemedContainer = ({ paddingSize, children, style }: ThemedContainerProps) => {
    const { currentTheme } = useTheme()

    const containerPadding = useMemo(() => {
        switch (paddingSize) {
            case 'sm':
                return padding * 4
            case 'lg':
                return padding * 8

            default:
                return padding * 4
        }
    }, [paddingSize])

    return (
        <View
            style={[
                { backgroundColor: currentTheme.colors.background },
                { padding: paddingSize == 'sm' ? padding : containerPadding },
                style,
            ]}
        >
            {children}
        </View>
    )
}

export default ThemedContainer

const styles = StyleSheet.create({})
