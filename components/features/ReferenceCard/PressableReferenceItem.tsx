import commonStyles from '@/constants/styles'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { MixedStyleDeclaration } from 'react-native-render-html'
import CustomHtmlRender from './CustomHtmlRender'

type PressableReferenceItemProps = {
    sectionId: string
    index: string
    sectionContent: string
    onSectionPress: (id: string) => void
}
const PressableReferenceItem = ({ onSectionPress, sectionId, sectionContent, index }: PressableReferenceItemProps) => {
    const { currentTheme, currentFontFamilies } = useTheme()

    const { width } = useWindowDimensions()

    const FONT_SIZE = 8

    const handleSectionPress = (id: string) => {
        onSectionPress(id)
    }

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
        additionalInfo: { height: 0 },
    } as Readonly<Record<string, MixedStyleDeclaration>>

    const tagStyles = {
        h1: {
            marginBottom: 2,
            marginTop: 0,
            fontSize: FONT_SIZE * 3,
            fontFamily:
                currentFontFamilies[0].family == 'heading'
                    ? currentFontFamilies[0].family
                    : currentFontFamilies[1].family,
        },
        h3: {
            marginBottom: 2,
            marginTop: 4,
            fontSize: FONT_SIZE * 1,
            lineHeight: FONT_SIZE * 1.5,
            fontFamily:
                currentFontFamilies[0].family == 'heading'
                    ? currentFontFamilies[0].family
                    : currentFontFamilies[1].family,
        },
        p: {
            marginBottom: padding,
            marginTop: 0,
            fontSize: 8,
            textAlign: 'left' as 'left',
            lineHeight: FONT_SIZE * 1.5,
        },
        u: { textDecorationLine: 'underline' },
        strong: {
            fontWeight: 'bold',
        },
        table: { marginBottom: 2, marginTop: 2, fontSize: 8 },
        th: {
            marginBottom: 0,
            marginTop: 0,
            fontSize: FONT_SIZE,
            borderWidth: 1,
            borderColor: 'black',
            padding: padding,
        },
        td: {
            marginBottom: 0,
            marginTop: 0,
            fontSize: FONT_SIZE,
            borderWidth: 1,
            borderColor: 'black',
            padding: padding,
        },
        tr: {
            flexDirection: 'row',
            flexGrow: 1,
            marginBottom: 0,
            marginTop: 0,
            fontSize: FONT_SIZE,
        } as Readonly<Record<string, MixedStyleDeclaration>>,
    }
    return (
        <Pressable
            onPress={() => handleSectionPress(sectionId)}
            key={index}
            style={[commonStyles.boxShadow, { marginVertical: 4, backgroundColor: currentTheme.colors.white }]}>
            <View
                style={[
                    {
                        flex: 1,
                        flexBasis: '50%',
                        borderWidth: 2,
                        borderColor: 'black',
                    },
                    ,
                ]}>
                <CustomHtmlRender
                    sectionId={sectionId}
                    index={index}
                    sectionContent={sectionContent}
                    classStyles={classStyles}
                    tagsStyles={tagStyles}
                />
            </View>
        </Pressable>
    )
}

export default PressableReferenceItem

const styles = StyleSheet.create({})
