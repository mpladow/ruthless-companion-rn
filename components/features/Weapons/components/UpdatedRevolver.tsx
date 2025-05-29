import React from 'react'
import { StyleSheet, View } from 'react-native'
import AmmoCheckbox from './AmmoCheckbox'

type UpdatedRevolverProps = {
    count: number // between 6 and 10
    radius?: number
    squareSize?: number
    onAmmoPress: () => void
}

const UpdatedRevolver: React.FC<UpdatedRevolverProps> = ({ count, radius = 100, squareSize = 20, onAmmoPress }) => {
    const containerSize = radius * 2 + squareSize

    const angleStep = (2 * Math.PI) / count
    const center = containerSize / 2

    const squares = Array.from({ length: count }, (_, i) => {
        const angle = i * angleStep - Math.PI / 2 // start at top
        const x = center + radius * Math.cos(angle) - squareSize / 2
        const y = center + radius * Math.sin(angle) - squareSize / 2

        return (
            <AmmoCheckbox
                style={[
                    styles.square,
                    {
                        // width: squareSize,
                        // height: squareSize,
                        left: x,
                        top: y,
                    },
                ]}
                key={i}
                onPress={onAmmoPress}
            />
        )
    })

    return (
        <View style={{ backgroundColor: 'pink' }}>
            <View style={[styles.container, { width: containerSize, height: containerSize }]}>{squares}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignSelf: 'center',
    },
    square: {
        position: 'absolute',
        borderRadius: 4,
    },
})

export default UpdatedRevolver
