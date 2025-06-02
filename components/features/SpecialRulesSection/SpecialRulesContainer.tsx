import { ThemedText } from '@/components/ThemedText/ThemedText'
import { SpecialRule } from '@/models/specialRuleTemplate'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useCallback } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import SpecialRuleCheckbox from './components/SpecialRuleCheckbox'

type SpecialRulesContainerProps = {
    specialRules: SpecialRule[]
    onSpecialRulesUsageChange: (specialRule: SpecialRule) => void
}
const SpecialRulesContainer = ({ specialRules, onSpecialRulesUsageChange }: SpecialRulesContainerProps) => {
    const { currentTheme } = useTheme()

    const handleSpecialRulesPress = useCallback(
        (specialRule: SpecialRule, undo: boolean) => {
            const currentState = { ...specialRule, currentUsage: specialRule.currentUsage }
            if (!undo) {
                if (currentState.currentUsage !== undefined && specialRule.maxUsage !== undefined) {
                    if (currentState.currentUsage + 1 > specialRule.maxUsage) {
                        currentState.currentUsage = specialRule.maxUsage
                    } else {
                        ++currentState.currentUsage
                    }
                    onSpecialRulesUsageChange(currentState)
                }
            } else {
                if (currentState.currentUsage !== undefined && specialRule.maxUsage !== undefined) {
                    if (currentState.currentUsage - 1 < 0) {
                        currentState.currentUsage = 0
                    } else {
                        --currentState.currentUsage
                    }
                    onSpecialRulesUsageChange(currentState)
                }
            }
        },
        [onSpecialRulesUsageChange, specialRules]
    )

    return (
        <View style={[styles.specialRulesContainer, { backgroundColor: currentTheme.colors.grey0 }]}>
            {specialRules.map((item, index) => (
                <View key={index} style={[styles.specialRulesInnerContainer]}>
                    <Pressable onPress={() => handleSpecialRulesPress(item, item?.currentUsage > 0)}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <ThemedText.Heading headingSize="h3">{item.name}</ThemedText.Heading>
                        </View>
                        <View>
                            <ThemedText.Text>{item.description}</ThemedText.Text>
                        </View>
                    </Pressable>
                    <Animated.View entering={Platform.OS !== 'web' ? FadeInRight : undefined}>
                        {item.maxUsage &&
                            [...Array(item.maxUsage)].map((item2, index) => {
                                let _checked = false
                                if (item.currentUsage == 0) {
                                    _checked = false
                                } else if (
                                    item.currentUsage &&
                                    item.currentUsage > 0 &&
                                    item.currentUsage >= index + 1
                                ) {
                                    _checked = true
                                }
                                return (
                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <SpecialRuleCheckbox
                                            onPress={() => handleSpecialRulesPress(item, _checked)}
                                            isChecked={_checked}
                                            boxSize={'sm'}
                                            isLastItem={false}
                                        />
                                    </View>
                                )
                            })}
                    </Animated.View>
                </View>
            ))}
        </View>
    )
}

export default SpecialRulesContainer

const styles = StyleSheet.create({
    specialRulesContainer: {
        flex: 1,
        width: '100%',
        padding: padding,
        paddingHorizontal: padding * 2,
        paddingBottom: padding * 3,
    },
    specialRulesInnerContainer: {
        flex: 1,
        marginTop: margin,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
