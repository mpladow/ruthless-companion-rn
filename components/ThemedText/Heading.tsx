import { useMemo } from 'react'
import Text, { type TextProps } from './Text'
import { type ThemedTextProps } from './ThemedText'

type HeadingProps = {
    /**
     * Controls the weight and fontsize for a heading, which all use the main Heading font family.
     * - h1: used for Main stack screens as the top most header
     * - h2: main section headers
     * - h3: minor section headers (same size as h2 but not bold)
     */
    headingSize: 'h1' | 'h2' | 'h3'
    color?: string
} & TextProps

/**
 * A Styled Text component that uses the heading font family.
 */
const Heading = ({ headingSize, italic, children, color, size, ...rest }: HeadingProps) => {
    const sizing = useMemo(() => {
        //   if (sizing) {
        //       return { weight: 'bold', sizing: headingSize }
        //   }
        switch (headingSize) {
            case 'h1':
                return {
                    weight: 'bold',
                    sizing: 'lg',
                }
            case 'h2':
                return {
                    weight: 'bold',
                    sizing: 'md',
                }
            case 'h3':
                return {
                    weight: 'semibold',
                    sizing: 'default',
                }
            default:
                return {
                    weight: 'bold',
                    sizing: 'lg',
                }
        }
    }, [headingSize])
    return (
        <Text
            {...rest}
            type={sizing.weight as ThemedTextProps['type']}
            italic={italic}
            size={size ?? (sizing.sizing as ThemedTextProps['size'])}
            family={'heading'}>
            {children}
        </Text>
    )
}

export default Heading
