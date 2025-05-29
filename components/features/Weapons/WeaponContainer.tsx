import { Weapon } from '@/models/weapon'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RangedWeapon from './components/RangedWeapon'
import WeaponControls from './components/WeaponControls'
type WeaponContainerType = {
    weapon: Weapon
}
const WeaponContainer = ({ weapon }: WeaponContainerType) => {
    const [ammo, setAmmo] = useState(weapon.currentAmmunition)
    const { currentTheme } = useTheme()
    const handleReloadPress = () => {
        setAmmo((old) => {
            if (old + 3 > weapon.maxAmmunition) {
                return weapon.maxAmmunition
            } else {
                return old + 3
            }
        })
    }
	 const handleReloadAllPress = () => {
		setAmmo(weapon.maxAmmunition)
	 }
    // fires weapon
    const handleAmmoButtonPress = () => {
        if (ammo) {
            setAmmo((old) => {
                return --old
            })
        }
    }

    return (
        <View style={{ flex: 1, width: '100%' }}>
            <WeaponControls
                weapon={weapon}
                currentAmmo={ammo}
                onReloadPress={handleReloadPress}
                onReloadAllPress={handleReloadAllPress}
            />
            <RangedWeapon maxAmmo={weapon?.maxAmmunition} currentAmmo={ammo} onAmmoPress={handleAmmoButtonPress} />
        </View>
    )
}

export default WeaponContainer

const styles = StyleSheet.create({})
