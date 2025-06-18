import { margin } from '@/theme/constants'
import React, { PropsWithChildren } from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import Animated from 'react-native-reanimated'

type ButtonContainerProps = {} & PropsWithChildren & ViewProps
const ButtonContainer = ({ children, ...props }: ButtonContainerProps) => {
    return (
        <Animated.View style={{ marginBottom: margin * 5, paddingHorizontal: margin * 2 }} {...props}>
            {children}
        </Animated.View>
    )
}

export default ButtonContainer

const styles = StyleSheet.create({})
