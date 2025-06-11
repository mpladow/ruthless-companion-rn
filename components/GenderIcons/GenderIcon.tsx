import { useTheme } from '@/theme/ThemeProvider'
import Foundation from '@expo/vector-icons/Foundation'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { GenderType } from '../features/GenderSwitcher/GenderSwitcher'

type GenderIconType = {
    invertColor?: boolean
    value: GenderType
} & ViewProps
const GenderIcon = ({ value, invertColor, ...rest }: GenderIconType) => {
    const { currentTheme } = useTheme()
    return (
        <View {...rest}>
            <Foundation
                name={value == 'male' ? 'male-symbol' : 'female-symbol'}
                size={24}
                color={invertColor ? currentTheme.colors.textInverted : currentTheme.colors.textDefault}
            />
        </View>
    )
}

export default GenderIcon

const styles = StyleSheet.create({})
