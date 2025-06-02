import { ThemedText } from '@/components'
import Bullet from '@/components/Icons/Bullet'
import ThemedButton from '@/components/ThemedButton/ThemedButton'
import { Weapon } from '@/models/weapon'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type WeaponControlsProps = {
    weapon: Weapon
    currentAmmo: number
    onReloadPress: () => void
    onReloadAllPress: () => void
}
const WeaponControls = ({ weapon, currentAmmo, onReloadPress, onReloadAllPress }: WeaponControlsProps) => {
    const { currentTheme } = useTheme()
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: padding,
            }}>
            <View>
                <ThemedText.Heading headingSize="h2">{weapon?.name}</ThemedText.Heading>

                <View>
                    {weapon.specialRules.length > 0 ? (
                        weapon?.specialRules.map((item, index) => (
                            <ThemedText.Text type="semibold">{item.name}</ThemedText.Text>
                        ))
                    ) : (
							<View style={{height: 16}}></View>
                    )}
                </View>
            </View>
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
    )
}

export default WeaponControls

const styles = StyleSheet.create({})
