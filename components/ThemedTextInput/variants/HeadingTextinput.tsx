import { ThemedText } from '@/components'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

interface CustomTextInputProps extends TextInputProps {
    label?: string
    error?: string
    containerStyle?: ViewStyle
    inputStyle?: TextInputProps['style']
    invertColor?: boolean
    value: string
}

const HeadingTextInput: React.FC<CustomTextInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    style,
    inputStyle,
    error,
    containerStyle,
    invertColor = false,
    ...rest
}) => {
    const { currentTheme, currentFontFamilies } = useTheme()
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <ThemedText.Text style={styles.label}>{label}</ThemedText.Text>}
            <TextInput
                style={[
                    {
                        fontFamily:
                            currentFontFamilies[0].family == 'heading'
                                ? currentFontFamilies[0].family
                                : currentFontFamilies[1].family,
                        fontSize: 20,
                        borderWidth: 1,
                        backgroundColor: currentTheme.colors.background,
                        padding: padding * 2,
                        color: invertColor ? currentTheme.colors.textInverted : currentTheme.colors.textDefault,
                    },
                    inputStyle,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={invertColor ? currentTheme.colors.grey2 : currentTheme.colors.greyOutline}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    label: {
        marginBottom: 6,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    error: {
        marginTop: 4,
        color: 'red',
        fontSize: 14,
    },
})

export default HeadingTextInput
