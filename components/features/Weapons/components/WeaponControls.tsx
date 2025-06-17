import { ThemedBottomSheet, ThemedText } from '@/components'
import { Weapon } from '@/models/weapon'
import { borderRadius, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import ReloadButton from './ReloadButton'

type WeaponControlsProps = {
    weapon: Weapon
    currentAmmo: number
    onReloadPress: () => void
    onReloadAllPress: () => void
}
const WeaponControls = ({ weapon, currentAmmo, onReloadPress, onReloadAllPress }: WeaponControlsProps) => {
    const { currentTheme } = useTheme()
    const [showWeaponDetails, setShowWeaponDetails] = useState(false)

    const handleReloadPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        onReloadPress()
    }
    return (
        <View style={styles.weaponContainer}>
            <View style={{ flex: 2, width: '100%' }}>
                <View style={{ paddingBottom: padding }}>
                    <Pressable
                        onPress={() => {
                            setShowWeaponDetails(true)
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ThemedText.Text size="md" type="bold">
                            {weapon?.name}
                        </ThemedText.Text>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                position: 'absolute',
                                right: 0,
                            }}>
                            {currentAmmo < weapon?.maxAmmunition ? (
                                <ReloadButton
                                    handleReloadPress={handleReloadPress}
                                    maxAmmunition={weapon.maxAmmunition}
                                />
                            ) : (
                                <View style={{ height: 24 }}></View>
                            )}
                        </View>
                    </Pressable>
                    <ThemedText.Text>
                        {weapon.shortRange}"/{weapon.longRange}"
                    </ThemedText.Text>
                </View>
                <View>
                    {weapon.specialRules.length > 0 ? (
                        weapon?.specialRules.map((item, index) => (
                            <View style={{ paddingVertical: 4, width: '100%' }}>
                                <ThemedText.Text type="semibold">{item.name}</ThemedText.Text>

                                <ThemedText.Text>{item.description}</ThemedText.Text>
                            </View>
                        ))
                    ) : (
                        <View style={{ height: 16 }}></View>
                    )}
                </View>
            </View>

            <ThemedBottomSheet
                visible={showWeaponDetails}
                onClose={() => setShowWeaponDetails(false)}
                allowCloseButton
                snapPoints={['40%']}
                headerTitle={'Create New Posse'}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ThemedText.Heading headingSize="h2">{weapon?.name}</ThemedText.Heading>
                        <ThemedText.Text type="semibold" size="md">
                            {weapon.shortRange}"/{weapon.longRange}"
                        </ThemedText.Text>
                    </View>
                    <View style={{ marginVertical: padding }}>
                        {weapon.specialRules.length > 0 &&
                            weapon?.specialRules.map((item, index) => (
                                <View
                                    style={{
                                        marginVertical: margin,
                                        backgroundColor: currentTheme.colors.grey0,
                                        padding: padding * 2,
                                        borderRadius: borderRadius / 2,
                                    }}>
                                    <ThemedText.Text type="semibold">{item.name}</ThemedText.Text>
                                    <ThemedText.Text>{item.description}</ThemedText.Text>
                                </View>
                            ))}
                    </View>
                    <View style={{ marginVertical: padding }}>
                        <ThemedText.Text type="semibold">Ammunition Capacity: {weapon.maxAmmunition}</ThemedText.Text>
                    </View>
                    <View
                        style={{
                            marginVertical: margin,
                            backgroundColor: currentTheme.colors.secondary,
                            padding: padding * 2,
                            borderRadius: borderRadius * 2,
                        }}>
                        {weapon.description && (
                            <ThemedText.Text inverted type="semibold">
                                {weapon.description}
                            </ThemedText.Text>
                        )}
                    </View>
                </View>
            </ThemedBottomSheet>
        </View>
    )
}

export default WeaponControls

const styles = StyleSheet.create({
    weaponContainer: {
        flex: 1,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: padding,
        paddingHorizontal: padding * 2,
    },
})
