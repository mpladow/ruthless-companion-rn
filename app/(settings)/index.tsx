import { ThemedText } from '@/components'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const index = () => {
    const { currentTheme } = useTheme()
    const { bottom } = useSafeAreaInsets()

    return (
        <Animated.ScrollView
            style={{
                flex: 1,
                paddingVertical: 4,
            }}
            contentContainerStyle={{
                flexGrow: 1,
                padding: padding * 2,
                paddingBottom: bottom * 3 + padding * 2,
            }}>
            <Animated.View>
                <ThemedText.Text>Settings</ThemedText.Text>
            </Animated.View>
        </Animated.ScrollView>
    )
}

export default index

const styles = StyleSheet.create({})
