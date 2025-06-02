import { ThemedText } from '@/components/ThemedText/ThemedText'
import { SpecialRule } from '@/models/specialRuleTemplate'
import { margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
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
                    console.log('🚀 ~ SpecialRulesContainer ~ currentState:', currentState)
                    if (currentState.currentUsage + 1 > specialRule.maxUsage) {
                        currentState.currentUsage = specialRule.maxUsage
                    } else {
                        ++currentState.currentUsage
                    }
                    onSpecialRulesUsageChange(currentState)
                }
            } else {
                if (currentState.currentUsage !== undefined && specialRule.maxUsage !== undefined) {
                    console.log('🚀 ~ SpecialRulesContainer ~ currentState:', currentState)
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
        <View
            style={{
                flex: 1,
                width: '100%',
                padding: padding,
                backgroundColor: currentTheme.colors.grey0,
                paddingBottom: padding * 3,
            }}>
            {specialRules.map((item, index) => (
                <View
                    style={{
                        flex: 1,
                        marginTop: margin,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <Pressable onPress={() => handleSpecialRulesPress(item, item.currentUsage > 0)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
                            <ThemedText.Heading headingSize="h3">{item.name}</ThemedText.Heading>
                            <ThemedText.Text>...{item.description}</ThemedText.Text>
                        </View>
                    </Pressable>
                    {item.maxUsage &&
                        [...Array(item.maxUsage)].map((item2, index) => {
                            let _checked = false
                            if (item.currentUsage == 0) {
                                _checked = false
                            } else if (item.currentUsage && item.currentUsage > 0 && item.currentUsage >= index + 1) {
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
                </View>
            ))}
        </View>
    )
}

export default SpecialRulesContainer

const styles = StyleSheet.create({})
