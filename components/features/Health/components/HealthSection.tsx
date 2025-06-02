import { ThemedText } from '@/components'
import { BodyPart } from '@/models/bodyParttemplate'
import { borderRadius, borderWidth } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { memo, useEffect, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import HealthCheckbox from './HealthCheckbox'

type HealthSectionProps = {
    bodyPart: BodyPart
    onHealthChange: (bodyPart: BodyPart) => void
}
const HealthSection = memo(({ bodyPart, onHealthChange }: HealthSectionProps) => {
    const [currentDamage, setCurrentDamage] = useState(bodyPart.currentDamage)
    const { currentTheme } = useTheme()
    const array = [...Array(bodyPart.maxHealth)]
    const handleHealthPress = (isHealing: boolean) => {
        if (isHealing) {
            setCurrentDamage((old) => {
                if (old - 1 == 0) {
                    return 0
                } else {
                    return --old
                }
            })
        } else {
            setCurrentDamage((old) => {
                if (old + 1 == bodyPart.maxHealth) {
                    return bodyPart.maxHealth
                } else {
                    return ++old
                }
            })
        }
    }

    useEffect(() => {
        onHealthChange({ ...bodyPart, currentDamage: currentDamage } as BodyPart)
    }, [currentDamage])

    return (
        <View
            style={{
                flexDirection: 'column',
                gap: 0,
                borderWidth: borderWidth + 1,
                borderRadius: borderRadius / 3,
                overflow: 'hidden',
            }}>
            <View
                style={[
                    { alignItems: 'center', backgroundColor: currentTheme.colors.primary },
                    currentDamage == bodyPart.maxHealth && { backgroundColor: currentTheme.colors.error },
                ]}>
                <ThemedText.Heading headingSize="h3" type="semibold" inverted style={[]}>
                    {bodyPart.name}
                </ThemedText.Heading>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {array.map((item, index) => {
                    let _checked = false
                    if (currentDamage > index) {
                        _checked = true
                    }
                    return (
                        <Animated.View
                            entering={Platform.OS !== 'web' ? FadeInDown.delay(index * 200).duration(200) : undefined}>
                            <HealthCheckbox
                                onPress={handleHealthPress}
                                isChecked={_checked}
                                boxSize={'sm'}
                                isLastItem={index == bodyPart.maxHealth - 1}
                            />
                        </Animated.View>
                    )
                })}
            </View>
        </View>
    )
})

export default HealthSection

const styles = StyleSheet.create({})
