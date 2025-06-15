import { ThemedText } from '@/components'
import PageContainer from '@/components/PageContainer/PageContainer'
import commonStyles from '@/constants/styles'
import { borderRadius, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useMemo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
type SmallListItemProps = {
    heading: string
    icon: React.ReactNode
    onPress: () => void
}
const SmallListItem = ({ heading, icon, onPress }: SmallListItemProps) => {
    const { currentTheme } = useTheme()

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
            })}>
            <View
                style={[
                    styles.listItem,
                    { backgroundColor: currentTheme.colors.background, justifyContent: 'space-between' },
                ]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: margin }}>
                    {icon}
                    <ThemedText.Text type="semibold">{heading}</ThemedText.Text>
                </View>
                <Entypo name="chevron-right" size={24} color={currentTheme.colors.greyOutline} />
            </View>
        </Pressable>
    )
}
const index = () => {
    const { currentTheme, toggleDarkMode, isDarkMode } = useTheme()
    const { bottom } = useSafeAreaInsets()

    const navigation = useNavigation()
    const router = useRouter()

    useEffect(() => {}, [])

    const settingsOptions = useMemo(
        () => [
            {
                heading: 'Edit Custom Characters',
                icon: (
                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: currentTheme.colors.textDefault,
                            overflow: 'hidden',
                            width: 28,
                        }}>
                        <Animated.Image
                            source={require('../../assets/images/cowboy-f-rev.png')}
                            style={{
                                height: 24,
                                width: 24,
                                marginBottom: 0,
                                marginLeft: -6,
                                tintColor: currentTheme.colors.textDefault,
                            }}
                        />
                        <Animated.Image
                            source={require('../../assets/images/cowboy-m-rev.png')}
                            style={{
                                height: 24,
                                width: 24,
                                marginBottom: 0,
                                marginLeft: -15,
                                tintColor: currentTheme.colors.textDefault,
                            }}
                        />
                    </Animated.View>
                ),
                onPress: () => router.navigate('./editCustomData'),
            },
            { heading: 'About', icon: 'info', onPress: () => router.navigate('./editCustomData') },
        ],
        [toggleDarkMode, isDarkMode, currentTheme.colors.textDefault, router]
    )
    return (
        <PageContainer paddingVertical="lg" fullScreenWidth={null}>
            <Animated.ScrollView
                style={{
                    flex: 1,
                    paddingVertical: 4,
                }}
                contentContainerStyle={{
                    flexWrap: 'wrap',
                    gap: 12,
                    //   flexGrow: 1,
                    padding: padding * 2,
                    paddingBottom: bottom * 3 + padding * 2,
                }}>
                {settingsOptions.map((item, index) => (
                    <SmallListItem key={index} heading={item.heading} icon={item.icon} onPress={item.onPress} />
                ))}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ThemedText.Text>Version 1.0.0</ThemedText.Text>
                </View>
            </Animated.ScrollView>
        </PageContainer>
    )
}

export default index

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        width: '100%',
        padding: padding * 3,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: borderRadius * 2,
        ...commonStyles.boxShadow,
    },
})
