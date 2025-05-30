import commonStyles from '@/constants/styles'
import { borderRadius, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { PropsWithChildren, useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type MessageboxProps = {
    type: 'warning' | 'error' | 'info'
    viewStyle: ViewProps['style']
} & PropsWithChildren &
    ViewProps
const Messagebox = ({ type, children, viewStyle }: MessageboxProps) => {
    const { currentTheme } = useTheme()

    const typestyles = useMemo(() => {
        switch (type) {
            case 'warning':
                return { backgroundColor: currentTheme.colors.warning, color: currentTheme.colors.textDefault }
            case 'error':
                return { backgroundColor: currentTheme.colors.error, color: currentTheme.colors.textDefault }
            case 'info':
                return { backgroundColor: currentTheme.colors.success, color: currentTheme.colors.textDefault }
        }
    }, [currentTheme, type])

    return (
        <View
            style={[
                { padding: padding * 3, borderRadius: borderRadius / 3 },
                commonStyles.boxShadow,
                typestyles,
                viewStyle,
            ]}>
            {children}
        </View>
    )
}

export default Messagebox

const styles = StyleSheet.create({})
