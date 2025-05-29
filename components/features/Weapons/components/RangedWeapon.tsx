import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import AmmoCheckbox from './AmmoCheckbox'

type RangedWeaponType = {
    maxAmmo?: number
    currentAmmo?: number
    onAmmoPress: () => void
}
const RangedWeapon = ({ maxAmmo, currentAmmo, onAmmoPress }: RangedWeaponType) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1, gap: 1, flexWrap: 'wrap' }}>
            {[...Array(maxAmmo)].map((item, index) => {
                let _checked = false
                if ((currentAmmo && currentAmmo <= index) || currentAmmo == 0) {
                    _checked = true
                }
                return (
                    <Animated.View
                        entering={Platform.OS !== 'web' ? FadeInDown.delay(index * 200).duration(200) : undefined}>
                        <AmmoCheckbox
                            onPress={onAmmoPress}
                            isChecked={_checked}
                            boxSize={maxAmmo && maxAmmo > 8 ? 'sm' : 'lg'}
                        />
                    </Animated.View>
                )
            })}
        </View>
    )
}

export default RangedWeapon

const styles = StyleSheet.create({})
