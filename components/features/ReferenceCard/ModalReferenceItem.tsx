import { borderRadius, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { MixedStyleDeclaration } from 'react-native-render-html'
import CustomHtmlRender from './CustomHtmlRender'

type ModalReferenceItemProps = {
    sectionId: string
    index: string
    sectionContent: string
}
const ModalReferenceItem = ({ sectionId, sectionContent, index }: ModalReferenceItemProps) => {
    const { currentTheme, currentFontFamilies } = useTheme()

    const { width } = useWindowDimensions()

    const htmlProps = {
        contentWidth: width * 0.88,
        baseFontStyle: { fontFamily: 'Arial' },
        // renderers: { table },
        textSelectable: true,
    }

    const FONT_SIZE = 8

    const DYNAMIC_FONT_SIZE = 16
    const DYNAMIC_PADDING = 8

    const classStyles = {
        fGrow: { flexGrow: 1 },
        f1: { flex: 1 },
        f2: { flex: 2 },
        tableHeader: {
            flex: 1,
            textAlign: 'center',
            fontWeight: 'bold',
        },
        backgroundDark: {
            backgroundColor: currentTheme.colors.textDefault,
        },
        backgroundPrimary: {
            backgroundColor: currentTheme.colors.primary,
        },
        textInverted: { color: currentTheme.colors.textInverted },
        textDefault: { color: currentTheme.colors.textDefault },
        leftAligned: { textAlign: 'left' },
        rightAligned: { textAlign: 'right' },
        centerAligned: { textAlign: 'center' },
        padding1: { padding: 4 },
        noBorder: { borderWidth: 0 },
        quote: {
            borderWidth: 4,
            borderColor: currentTheme.colors.textDefault,
        },
        additionalInfo: {
            marginTop: margin,
            padding: padding * 2,
            borderRadius: borderRadius,
            borderWidth: 1,
            color: currentTheme.colors.textInverted,
            backgroundColor: currentTheme.colors.secondary,
        },
    } as Readonly<Record<string, MixedStyleDeclaration>>

    const tagStyles = {
        h1: {
            marginBottom: 2,
            marginTop: 0,
            fontSize: DYNAMIC_FONT_SIZE * 2,
            fontFamily:
                currentFontFamilies[0].family == 'heading'
                    ? currentFontFamilies[0].family
                    : currentFontFamilies[1].family,
        },
        h3: {
            marginBottom: 2,
            marginTop: 4,
            fontSize: DYNAMIC_FONT_SIZE * 1,
            lineHeight: DYNAMIC_FONT_SIZE * 1.5,
            fontFamily:
                currentFontFamilies[0].family == 'heading'
                    ? currentFontFamilies[0].family
                    : currentFontFamilies[1].family,
        },
        u: { textDecorationLine: 'underline' },
        strong: {
            fontWeight: 'bold',
        },
        p: {
            marginBottom: DYNAMIC_PADDING * 2,
            marginTop: 0,
            fontSize: DYNAMIC_FONT_SIZE,
            textAlign: 'left' as 'left',
            lineHeight: DYNAMIC_FONT_SIZE * 1.5,
        },
        table: { marginBottom: DYNAMIC_PADDING * 2, marginTop: DYNAMIC_PADDING, fontSize: DYNAMIC_FONT_SIZE },
        th: {
            marginBottom: 0,
            marginTop: 0,
            fontSize: DYNAMIC_FONT_SIZE,
            borderWidth: 1,
            borderColor: 'black',
            padding: padding,
        },
        td: {
            marginBottom: 0,
            marginTop: 0,
            fontSize: DYNAMIC_FONT_SIZE,
            borderWidth: 1,
            borderColor: 'black',
            padding: padding,
        },
        tr: {
            flexDirection: 'row',
            flexGrow: 1,
            marginBottom: 0,
            marginTop: 0,
            fontSize: DYNAMIC_FONT_SIZE,
        } as Readonly<Record<string, MixedStyleDeclaration>>,
    }
    return (
        <CustomHtmlRender
            sectionId={sectionId}
            index={index}
            sectionContent={sectionContent}
            classStyles={classStyles}
            tagsStyles={tagStyles}
        />
    )
}

export default ModalReferenceItem

const styles = StyleSheet.create({})
