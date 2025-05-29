import React, { ReactNode, useEffect } from 'react'
import { Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface CustomModalProps {
    visible: boolean
    onClose: () => void
    children: ReactNode
}
const CustomModal = ({ visible, onClose, children }: CustomModalProps) => {
    const opacity = useSharedValue(0)
    const scale = useSharedValue(0.95)

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) })
            scale.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) })
        } else {
            opacity.value = withTiming(0, { duration: 200 })
            scale.value = withTiming(0.95, { duration: 200 })
        }
    }, [visible])

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }))

    const modalStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }))
    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={onClose} statusBarTranslucent={true}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, backdropStyle]}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.modalContent, modalStyle]}>{children}</Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        maxWidth: '90%',
        elevation: 5,
    },
})

export default CustomModal
