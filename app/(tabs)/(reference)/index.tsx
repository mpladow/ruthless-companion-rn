import { ThemedBottomSheet, ThemedText } from '@/components'
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
import { Image, StyleSheet, View } from 'react-native'
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
    console.log('🚀 ~ index ~ TEST_CONTENT:', TEST_CONTENT)

    const { currentTheme, currentFontFamilies } = useTheme()
    const [focusedSection, setFocusedSection] = useState<Section | null>(null)

    const handleSectionPress = (sectionId: string) => {
        console.log('Section pressed:', sectionId)
        if (data?.sections) {
            setFocusedSection(data?.sections.find((section) => section.id === sectionId) || null)
            setOpenBottomSheet(true)
        }
    }
    const HEADINGFONTSIZE = 44
	 const version = Constants ? Constants.buildNumber?.version : '1.0.0'

    return (
        <>
            <PageContainer paddingHorizontal="sm" paddingVertical="lg" fullScreenWidth={'50%'}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 2, flexWrap: 'wrap' }} style={{ flex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: currentTheme.colors.primary,
                            borderWidth: 4,
                            borderColor: currentTheme.colors.textDefault,
                            flexDirection: 'row',
                        }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                            <View
                                style={{
                                    marginTop: margin,
                                    padding: padding * 2,
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                }}>
                                <ThemedText.Heading
                                    headingSize="h1"
                                    inverted
                                    style={{
                                        fontSize: HEADINGFONTSIZE + 32,
                                        lineHeight: HEADINGFONTSIZE + 32,
                                        textTransform: 'uppercase',
                                    }}>
                                    R
                                </ThemedText.Heading>
                                <View>
                                    <ThemedText.Heading
                                        headingSize="h1"
                                        inverted
                                        style={{
                                            fontSize: HEADINGFONTSIZE,
                                            lineHeight: HEADINGFONTSIZE,
                                            textTransform: 'uppercase',
                                        }}>
                                        uthless
                                    </ThemedText.Heading>
                                    <ThemedText.Heading
                                        inverted
                                        headingSize="h3"
                                        style={{
                                            paddingLeft: padding,
                                            textTransform: 'uppercase',
                                            fontSize: 11,
                                            lineHeight: 11,
                                        }}>
                                        The Fastest Rules in the West
                                    </ThemedText.Heading>
                                </View>
                            </View>
                        </View>

                        <View>
                            <View
                                style={{
                                    overflow: 'hidden',
                                    width: 50,
                                    height: 100,
                                    flexDirection: 'row',
                                    backgroundColor: currentTheme.colors.searchBg,
                                }}>
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        width: 50,
                                        height: 100,
                                        marginBottom: -10,
                                    }}>
                                    <Image
                                        source={require('../../../assets/images/cowboy-sharper3.png')}
                                        style={{ height: 100, width: 50, marginBottom: -10 }}
                                    />
                                </View>
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        width: 50,
                                        height: 100,
                                        marginBottom: -10,
                                    }}>
                                    <Image
                                        source={require('../../../assets/images/cowboy-f-rev.png')}
                                        style={{ height: 100, width: 500, marginBottom: -10 }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            padding: padding,
                            backgroundColor: currentTheme.colors.textDefault,
                            flexDirection: 'column',
                        }}>
                        <ThemedText.Text inverted size="xs">
                            Authors: {data?.authors.join(', ')}
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
                                <View style={{ flex: 1, borderWidth: 2, borderColor: 'black' }}>
                                    <PressableReferenceItem
                                        sectionId={item.id}
                                        key={index}
                                        index={index.toString()}
                                        sectionContent={item.content}
                                        onSectionPress={handleSectionPress}
                                    />
                                </View>
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
