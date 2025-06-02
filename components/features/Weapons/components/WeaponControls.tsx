import { ThemedBottomSheet, ThemedText } from '@/components'
import Bullet from '@/components/Icons/Bullet'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { Weapon } from '@/models/weapon'
import { borderRadius, margin, padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Feather from '@expo/vector-icons/Feather'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

type WeaponControlsProps = {
    weapon: Weapon
    currentAmmo: number
    onReloadPress: () => void
    onReloadAllPress: () => void
}
const WeaponControls = ({ weapon, currentAmmo, onReloadPress, onReloadAllPress }: WeaponControlsProps) => {
    const { currentTheme } = useTheme()
    const [showWeaponDetails, setShowWeaponDetails] = useState(false)
    return (
        <View
            style={{
                flex: 1,
                gap: 6,

                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingVertical: padding,
                paddingHorizontal: padding * 2,
            }}>
            <View style={{ flex: 2 }}>
                <View>
                    <Pressable
                        onPress={() => {
                            setShowWeaponDetails(true)
                        }}
                        style={{ paddingVertical: 8 }}>
                        <ThemedText.Heading headingSize="h2">{weapon?.name}</ThemedText.Heading>
                    </Pressable>
                    <ThemedText.Text>
                        {weapon.shortRange}"/{weapon.longRange}"
                    </ThemedText.Text>
                </View>
                <View>
                    {weapon.specialRules.length > 0 ? (
                        weapon?.specialRules.map((item, index) => (
                            <View style={{ paddingVertical: 4 }}>
                                <ThemedText.Text type="semibold">{item.name}</ThemedText.Text>

                                {/* <ThemedText.Text>{item.description}</ThemedText.Text> */}
                            </View>
                        ))
                    ) : (
                        <View style={{ height: 16 }}></View>
                    )}
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {currentAmmo < weapon?.maxAmmunition ? (
                    <ThemedButton
                        onLongPress={onReloadAllPress}
                        title={
                            <View
                                style={{
                                    position: 'relative',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Feather name="refresh-cw" size={20} color={currentTheme.colors.textInverted} />
                                <View
                                    style={{
                                        paddingHorizontal: 4,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 4,
                                        marginLeft: 4,
                                    }}>
                                    <ThemedText.Text size="default" inverted type="bold">
                                        {weapon.maxAmmunition < 3 ? weapon.maxAmmunition : '3'}
                                    </ThemedText.Text>
                                </View>
                                <View style={{ height: 20, width: 20 }}>
                                    <Bullet fill={currentTheme.colors.textInverted} />
                                </View>
                            </View>
                        }
                        onPress={onReloadPress}
                        variant="primary"
                        size={'sm'}
                        style={{ paddingVertical: 4, paddingHorizontal: 8 }}
                    />
                ) : (
                    <View style={{ height: 24 }}></View>
                )}
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

const styles = StyleSheet.create({})
