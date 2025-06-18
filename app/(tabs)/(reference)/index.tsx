import { ThemedBottomSheet, ThemedText } from '@/components'
import CustomBrandHeader from '@/components/features/ReferenceCard/CustomBrandHeader'
import ModalReferenceItem from '@/components/features/ReferenceCard/ModalReferenceItem'
import PressableReferenceItem from '@/components/features/ReferenceCard/PressableReferenceItem'
import PageContainer from '@/components/PageContainer/PageContainer'
import { rules } from '@/data/Reference/rules'
import { Reference } from '@/models/reference/reference'
import { Section } from '@/models/reference/section'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Constants from 'expo-constants'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const index = () => {
    const [openBottomSheet, setOpenBottomSheet] = useState(false)
    const TEST_CONTENT = require('@/data/Reference/rules')
    async function fetchHTML(url: string): Promise<string | null> {
        try {
            const response = await fetch(url)
            return response.text() // This is the raw HTML string
        } catch (error) {
            console.error('Error fetching HTML:', error)
            return null
        }
    }
    const [data, setData] = useState<Reference>()
    const getReferenceDataAsync = async () => {
        setData(rules)
    }
    useEffect(() => {
        getReferenceDataAsync()
    }, [])

    const { currentTheme, currentFontFamilies } = useTheme()
    const [focusedSection, setFocusedSection] = useState<Section | null>(null)

    const handleSectionPress = (sectionId: string) => {
        console.log('Section pressed:', sectionId)
        if (data?.sections) {
            setFocusedSection(data?.sections.find((section) => section.id === sectionId) || null)
            setOpenBottomSheet(true)
        }
    }
    const version = Constants ? Constants.expoConfig?.version : '1.0.0'
    console.log(Constants, 'CONSTANTS')
    return (
        <>
            <PageContainer paddingHorizontal="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 2, flexWrap: 'wrap' }} style={{ flex: 1 }}>
                    <CustomBrandHeader isHeading={false} />
                    <View
                        style={{
                            padding: padding,
                            backgroundColor: currentTheme.colors.textDefault,
                            flexDirection: 'column',
                        }}>
                        <ThemedText.Text inverted size="xs">
                            Authors: {data?.authors && data?.authors.join(', ')}
                        </ThemedText.Text>
                        <ThemedText.Text inverted size="xs">
                            App developed by: ML Development
                        </ThemedText.Text>
                        <ThemedText.Text inverted size="xs">
                            App Version: {version}
                        </ThemedText.Text>
                    </View>
                    <View
                        style={{ flexDirection: 'column', flexWrap: 'wrap', width: '100%', marginBottom: margin * 6 }}>
                        {data?.sections
                            ?.filter((x) => x.page === 1)
                            .map((item, index) => (
                                <PressableReferenceItem
                                    sectionId={item.id}
                                    key={index}
                                    index={index.toString()}
                                    sectionContent={item.content}
                                    onSectionPress={handleSectionPress}
                                />
                                //   <CustomHtmlRender
                                //       sectionId={item.id}
                                //       key={index}
                                //       sectionContent={item.content}
                                //       onSectionPress={handleSectionPress}
                                //       index={index.toString()}
                                //   />
                            ))}
                    </View>
                    <View
                        style={{ flexDirection: 'column', flexWrap: 'wrap', width: '100%', marginBottom: margin * 6 }}>
                        {data?.sections
                            ?.filter((x) => x.page === 2)
                            .map((item, index) => (
                                <PressableReferenceItem
                                    sectionId={item.id}
                                    key={index}
                                    index={index.toString()}
                                    sectionContent={item.content}
                                    onSectionPress={handleSectionPress}
                                />
                            ))}
                    </View>
                </ScrollView>
            </PageContainer>
            <ThemedBottomSheet
                visible={openBottomSheet}
                onClose={() => setOpenBottomSheet(false)}
                allowCloseButton
                snapPoints={['40%', '80%']}
                enableDynamicSizing
                detached={false}
                headerTitle={focusedSection?.title || 'Section Details'}
                scrollable>
                <View>
                    <ModalReferenceItem
                        sectionId={focusedSection?.id || ''}
                        index={focusedSection?.id || ''}
                        sectionContent={focusedSection?.content || ''}
                    />
                </View>
            </ThemedBottomSheet>
        </>
    )
}

export default index

const styles = StyleSheet.create({})
