import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import RenderHtml, { MixedStyleDeclaration } from 'react-native-render-html'

type CustomHtmlRenderProps = {
    sectionId: string
    index: string
    sectionContent: string
    classStyles: Readonly<Record<string, MixedStyleDeclaration>>
    tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> | undefined
}
const CustomHtmlRender = ({ sectionContent, index, classStyles, tagsStyles }: CustomHtmlRenderProps) => {
    const { currentTheme, currentFontFamilies } = useTheme()

    const { width } = useWindowDimensions()

    const htmlProps = {
        contentWidth: width * 0.88,
        baseFontStyle: { fontFamily: 'Arial' },
        // renderers: { table },
        textSelectable: true,
    }
    const renderers = {
        img: {
            enableExperimentalPercentWidth: true,
        },
    }
    const FONT_SIZE = 8

    return (
        <RenderHtml
            enableCSSInlineProcessing
            key={index}
            systemFonts={currentFontFamilies.map((x) => x.family)}
            baseStyle={{
                fontFamily:
                    currentFontFamilies[0].type == 'primary'
                        ? currentFontFamilies[0].family
                        : currentFontFamilies[1].family,
                fontSize: FONT_SIZE,
            }}
            classesStyles={classStyles}
            tagsStyles={tagsStyles}
            source={{ html: sectionContent }}
				renderersProps={renderers}
            {...htmlProps}
        />
    )
}

export default CustomHtmlRender

const styles = StyleSheet.create({})
