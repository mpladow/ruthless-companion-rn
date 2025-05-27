import type { PropsWithChildren } from 'react'
import type { TextProps as NativeTextProps, TextPropsAndroid, TextPropsIOS } from 'react-native'
import { ThemedText, ThemedTextProps } from './ThemedText'

export type TextProps = {
    type?: ThemedTextProps['type']
    italic?: ThemedTextProps['italic']
    size?: ThemedTextProps['size']
    family?: ThemedTextProps['family']
    style?: ThemedTextProps['style']
    inverted?: ThemedTextProps['inverted']
} & PropsWithChildren &
    NativeTextProps &
    TextPropsIOS &
    TextPropsAndroid

/**
 * The default text element. All other variants should use a variation of this component
 * @param param0
 * @returns
 */
const Text = ({ type, style, italic, size, family, children, inverted, ...rest }: TextProps) => {
    return (
        <ThemedText
            inverted={inverted}
            type={type ?? 'regular'}
            italic={italic ?? false}
            family={family ?? 'primary'}
            size={size ?? 'default'}
            {...rest}
        >
            {children}
        </ThemedText>
    )
}

export default Text
