import { ThemedText } from '@/components/ThemedText/ThemedText'
import { BodyPart } from '@/models/bodyParttemplate'
import { padding, TypopgraphySize } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Foundation from '@expo/vector-icons/Foundation'
import React, { useMemo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { HealthStatus } from '../CharacterCard/CharacterCard'
import HealthSection from './components/HealthSection'

type HealthBarContainerProps = {
    bodyParts?: BodyPart[]
    onHealthChange: (bodyPart: BodyPart) => void
}
const HealthBarContainer = ({ bodyParts, onHealthChange }: HealthBarContainerProps) => {
    const { currentTheme } = useTheme()
    const handleHeathSectionChange = (bodyPart: BodyPart) => {
        onHealthChange(bodyPart)
    }
    const healthStatus = useMemo(() => {
        const healthStatus: HealthStatus = {
            status: 'Healthy',
            relevantBodyParts: [],
            component: null,
        }
        if (bodyParts) {
            const incapacitated = bodyParts && bodyParts.filter((x) => x.currentDamage >= x.maxHealth)
            if (incapacitated.length == bodyParts.length) {
                healthStatus.status = 'Very Dead'
                healthStatus.component = (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            width: Dimensions.get('window').width - 50,
                        }}>
                        <Foundation name="skull" size={24} color={'red'} />
                        <ThemedText.Text style={{ color: 'red', textTransform: 'uppercase' }} type="semibold">
                            Very Dead
                        </ThemedText.Text>
                        <Foundation name="skull" size={24} color={'red'} />
                    </View>
                )
                return healthStatus
            }
            if (incapacitated.length > 0) {
                healthStatus.status = 'Incapacitated'
                healthStatus.component = (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4,
                            width: Dimensions.get('window').width - 50,
                        }}>
                        <Foundation name="skull" size={24} color={'red'} />
                        <ThemedText.Text style={{ color: 'red', textTransform: 'uppercase' }} type="semibold">
                            Incapacitated
                        </ThemedText.Text>
                    </View>
                )
                return healthStatus
            }

            const fullHealth = bodyParts && bodyParts.every((x) => x.currentDamage == 0)
            if (fullHealth) {
                healthStatus.status = 'Healthy'
                healthStatus.component = (
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 4,
                            width: Dimensions.get('window').width - 50,
                        }}>
                        <FontAwesome6 name="heart-pulse" size={20} color={currentTheme.colors.success} />

                        <ThemedText.Text
                            style={{ color: currentTheme.colors.success, textTransform: 'uppercase' }}
                            type="semibold">
                            Healthy
                        </ThemedText.Text>
                    </View>
                )
                return healthStatus
            }

            const wounded = bodyParts.filter((x) => x.currentDamage > 0)
            if (wounded.length > 0) {
                healthStatus.status = 'Wounded'
                healthStatus.relevantBodyParts = wounded
                healthStatus.component = (
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 4,
                            width: Dimensions.get('window').width - 50,
                        }}>
                        <FontAwesome name="plus" size={20} color={currentTheme.colors.error} />

                        <ThemedText.Text
                            style={{ color: currentTheme.colors.error, textTransform: 'uppercase' }}
                            type="semibold">
                            Wounded
                        </ThemedText.Text>
                    </View>
                )
                return healthStatus
            }
        }
        return healthStatus
    }, [bodyParts])

    return (
        <View style={styles.HealthBarContainer}>
            <View style={styles.healthBarStatusContainer}>
                {healthStatus.component ? healthStatus.component : 'Health Status'}
            </View>
            <View style={styles.healthBarSectionContainer}>
                {bodyParts?.map((item, index) => {
                    return <HealthSection key={index} bodyPart={item} onHealthChange={handleHeathSectionChange} />
                })}
            </View>
        </View>
    )
}

export default HealthBarContainer

const styles = StyleSheet.create({
    HealthBarContainer: { flex: 1, padding: padding, paddingHorizontal: padding * 2, alignItems: 'center' },
    healthBarStatusContainer: {
        flexDirection: 'row',
        flex: 1,
        gap: 8,
        marginLeft: 4,
        alignItems: 'center',
        height: TypopgraphySize.textLarge.lineHeight + padding,
    },
    healthBarSectionContainer: {
        flexDirection: 'row',
        flex: 2,
        gap: 4,
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
})
