import { Text as NativeText, StyleProp, TextStyle, type TextProps } from 'react-native'

import { TypopgraphySize } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import { FontType } from '@/theme/types/type'
import { useMemo } from 'react'
import Heading from './Heading'
import Text from './Text'

export type ThemedTextProps = {
    style?: StyleProp<TextStyle>
    size: 'xs' | 'default' | 'md' | 'lg'
    type: 'regular' | 'semibold' | 'bold' | 'link'
    italic?: boolean
    inverted?: boolean
    family: FontType
} & TextProps

export function ThemedText({
    style,

    inverted = false,
    type = 'regular',
    family,
    size,
    italic,
    ...rest
}: ThemedTextProps) {
    const { currentTheme, currentFontFamilies } = useTheme()
    const fontFamily = useMemo(() => {
        return currentFontFamilies.find((x) => x.type == family)
    }, [currentFontFamilies])

    const textSizing = useMemo(() => {
        switch (size) {
            case 'xs':
                return TypopgraphySize.textXSmall
            case 'default':
                return TypopgraphySize.textSmall
            case 'md':
                return TypopgraphySize.textMedium
            case 'lg':
                return TypopgraphySize.textLarge
            default:
            case 'default':
                return TypopgraphySize.textSmall
        }
    }, [size])

    const fontFamilyStyling = useMemo(() => {
        switch (type) {
            case 'bold':
                if (italic) {
                    return fontFamily?.boldItalic
                } else {
                    return fontFamily?.bold
                }
            case 'semibold':
                if (italic) {
                    return fontFamily?.mediumItalic
                } else {
                    return fontFamily?.medium
                }
            case 'regular':
                if (italic) {
                    return fontFamily?.regularItalic
                } else {
                    return fontFamily?.regular
                }
            default:
                if (italic) {
                    return fontFamily?.regularItalic
                } else {
                    return fontFamily?.regular
                }
        }
    }, [fontFamily])
    return (
        <NativeText
            style={[
                { color: !inverted ? currentTheme.colors.textDefault : currentTheme.colors.textInverted },
                textSizing,
                fontFamilyStyling,
                style,
            ]}
            {...rest}
        />
    )
}

ThemedText.Text = Text
ThemedText.Heading = Heading
