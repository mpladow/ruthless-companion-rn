import GenderIcon from '@/components/GenderIcons/GenderIcon'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export type GenderType = 'male' | 'female'
type GenderSwitcherProps = {
    value: GenderType
    onChange: (value: GenderType) => void
}
const GenderSwitcher = ({ value, onChange }: GenderSwitcherProps) => {
    const { currentTheme } = useTheme()
    return (
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', padding: padding }}>
            <ThemedButton
                onPress={() => onChange('male')}
                title={<GenderIcon value={'male'} invertColor={value == 'male'} />}
                variant="icon"
                size={'sm'}
                style={[
                    value == 'male'
                        ? { backgroundColor: currentTheme.colors.primary }
                        : { backgroundColor: 'transparent' },
                    { paddingVertical: padding },
                ]}
            />
            <ThemedButton
                onPress={() => onChange('female')}
                title={<GenderIcon value={'female'} invertColor={value == 'female'} />}
                variant="icon"
                size={'sm'}
                style={[
                    value == 'female' ? { backgroundColor: currentTheme.colors.primary } : {},
                    { paddingVertical: padding },
                ]}
            />
        </View>
    )
}

export default GenderSwitcher

const styles = StyleSheet.create({})
