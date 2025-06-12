import { Weapon } from '@/models/weapon'
import { padding } from '@/theme/constants'
import { useTheme } from '@/theme/ThemeProvider'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RangedWeapon from './components/RangedWeapon'
import WeaponControls from './components/WeaponControls'
type WeaponContainerType = {
    weapon: Weapon
    onAmmoChange: (weapon: Weapon) => void
    readOnly?: boolean
}
const WeaponContainer = ({ weapon, onAmmoChange, readOnly }: WeaponContainerType) => {
    const [ammo, setAmmo] = useState(weapon.currentAmmunition)
    const { currentTheme } = useTheme()
    //  const dispatch = useDispatch<AppDispatch>()
    //  useEffect(() => {
    // 	dispatch(setCurrentAmmoForWeapon({ weapon: weapon, characterId } as SetWeaponForCharacter))
    //  }, [ammo])

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

    useEffect(() => {
        onAmmoChange({ ...weapon, currentAmmunition: ammo } as Weapon)
    }, [ammo])

    return (
        <View style={{ flex: 1, width: '100%', padding: padding }}>
            <WeaponControls
                weapon={weapon}
                currentAmmo={ammo}
                onReloadPress={handleReloadPress}
                onReloadAllPress={handleReloadAllPress}
            />
            {!readOnly && (
                <RangedWeapon maxAmmo={weapon?.maxAmmunition} currentAmmo={ammo} onAmmoPress={handleAmmoButtonPress} />
            )}
        </View>
    )
}

export default WeaponContainer

const styles = StyleSheet.create({})
