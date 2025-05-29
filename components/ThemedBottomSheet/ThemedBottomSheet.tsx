import { useResponsiveWidth } from '@/hooks'
import { borderRadius, margin } from '@/theme/constants'
import BottomSheet from '@gorhom/bottom-sheet'
import React, { ReactNode, useEffect, useMemo, useRef } from 'react'
import { Dimensions, Modal, Platform, Pressable, StyleSheet, View } from 'react-native'
import { ThemedText } from '..'

type ThemedBottomSheetProps = {
    visible: boolean
    onClose: () => void
    children: ReactNode
    headerTitle?: string
    allowCloseButton?: boolean
    snapPoints?: (string | number)[]
}

const ThemedBottomSheet: React.FC<ThemedBottomSheetProps> = ({
    visible,
    onClose,
    children,
    headerTitle,
    allowCloseButton,
    snapPoints = ['25%', '50%'],
}) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const isWeb = Platform.OS === 'web'

    const sheetSnapPoints = useMemo(() => snapPoints, [snapPoints])
    const { viewport } = useResponsiveWidth()

    useEffect(() => {
        if (!isWeb && bottomSheetRef.current) {
            if (visible) {
                bottomSheetRef.current.expand()
            } else {
                bottomSheetRef.current.close()
            }
        }
    }, [visible, isWeb])

    if (isWeb) {
        return (
            <Modal transparent visible={visible} onRequestClose={onClose}>
                <Pressable style={styles.overlay} onPress={onClose} />

                <View style={[styles.modalContainer]}>
                    <View
                        style={[
                            {
                                backgroundColor: 'white',

                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: margin,
                            },
                        ]}
                    >
                        <View></View>
                        <View>
                            <ThemedText.Text>{headerTitle}</ThemedText.Text>
                        </View>
                        {allowCloseButton ? (
                            <View>
                                <Pressable onPress={onClose}>
                                    <ThemedText.Text>X</ThemedText.Text>
                                </Pressable>
                            </View>
                        ) : (
                            <View></View>
                        )}
                    </View>
                    <View style={{ padding: margin }}>{children}</View>
                </View>
            </Modal>
        )
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={visible ? 1 : -1}
            snapPoints={sheetSnapPoints}
            onClose={onClose}
            enablePanDownToClose
        >
            <View style={styles.sheetContent}>{children}</View>
        </BottomSheet>
    )
}

export default ThemedBottomSheet

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000077',
    },
    modalContainer: {
        //   position: 'absolute',
        //   bottom: 0,
        //   width: '100%',
        flex: 1,
        //   height: '100%',
        //   maxHeight: height * 0.5,
        borderRadius: borderRadius,
        zIndex: 9,
        backgroundColor: 'white',
    },
    sheetContent: {
        flex: 1,
        padding: 16,
    },
})
