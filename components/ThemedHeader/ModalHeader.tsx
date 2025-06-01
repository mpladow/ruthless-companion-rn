import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import React from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '..'

type ModalHeaderProps = {
    title: string
    showBack?: boolean
    rightComponent?: React.ReactNode
    blurBackground?: boolean
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, showBack = false, rightComponent, blurBackground }) => {
    const router = useRouter()
    const { currentTheme } = useTheme()

    const headerContent = (
        <View style={[styles.container, { backgroundColor: currentTheme.colors.primary }]}>
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 80,
                }}>
                {showBack && (
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Entypo name="chevron-thin-left" size={24} color={currentTheme.colors.textInverted} />
                    </Pressable>
                )}
                <ThemedText.Heading inverted headingSize="h2">
                    {title}
                </ThemedText.Heading>
                <View style={styles.rightContainer}>{rightComponent ?? <View style={styles.placeholder} />}</View>
            </View>
        </View>
    )
    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            {Platform.OS === 'ios' && blurBackground ? (
                <BlurView
                    style={[styles.container, { backgroundColor: currentTheme.colors.primary }]}
                    blurType={currentTheme.isDark ? 'dark' : 'light'}
                    blurAmount={10}
                    reducedTransparencyFallbackColor={currentTheme.isDark ? '#222' : '#fff'}>
                    {headerContent}
                </BlurView>
            ) : (
                <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
                    {headerContent}
                </View>
            )}
        </SafeAreaView>
    )
}

export default ModalHeader

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        height: 80,
        paddingVertical: padding * 2,
        marginBottom: 12,
        //   paddingHorizontal: padding * 2,
        paddingTop: Platform.OS === 'ios' ? 24 : 0,
        flexDirection: 'row',
        alignItems: 'center',
        //   borderBottomColor: '#eee',
        //   borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    placeholder: {
        width: 32, // same width as back icon for symmetry
    },
    title: {
        flex: 1,
        backgroundColor: 'pink',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    rightContainer: {
        width: 32,
        alignItems: 'flex-end',
    },
})
