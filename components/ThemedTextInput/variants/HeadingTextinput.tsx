import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

interface CustomTextInputProps extends TextInputProps {
    label?: string
    error?: string
    containerStyle?: ViewStyle
    inputStyle?: TextInputProps['style']
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
    ...rest
}) => {
    const { currentTheme, currentFontFamilies } = useTheme()
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    {
                        fontFamily:
                            currentFontFamilies[0].family == 'heading'
                                ? currentFontFamilies[0].family
                                : currentFontFamilies[1].family,
                        fontSize: 20,
                        color: currentTheme.colors.textInverted,
                    },
                    inputStyle,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                {...rest}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
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
