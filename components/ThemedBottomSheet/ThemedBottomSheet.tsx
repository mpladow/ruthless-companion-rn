import { useResponsiveWidth } from '@/hooks'
import { borderRadius, margin, padding } from '@/theme/constants'
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react'
import { Dimensions, Modal, Platform, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '..'

type ThemedBottomSheetProps = {
    visible: boolean
    onClose: () => void
    children: ReactNode
    headerTitle?: string
    allowCloseButton?: boolean
    customFooter?: ReactNode
    snapPoints?: (string | number)[]
}

const ThemedBottomSheet: React.FC<ThemedBottomSheetProps> = ({
    visible,
    onClose,
    children,
    headerTitle,
    allowCloseButton,
    customFooter,
    snapPoints = [0.5, 0.75],
}) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const isWeb = Platform.OS === 'web'

    const sheetSnapPoints = useMemo(() => snapPoints, [snapPoints])
    const { viewport } = useResponsiveWidth()
    const insets = useSafeAreaInsets()

    useEffect(() => {
        if (!isWeb && bottomSheetRef.current) {
            if (visible) {
                console.log('🚀 ~ useEffect ~ opening:', visible)
                console.log('dsfaaaasdf', JSON.stringify(bottomSheetRef))
                bottomSheetRef.current.present()
            } else {
                console.log('🚀 ~ useEffect ~ closing:', visible)

                bottomSheetRef?.current.close()
            }
        }
    }, [visible, isWeb, bottomSheetRef])

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
                        ]}>
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
    // renders
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
        []
    )
    const renderFooter = useCallback(
        (props) => (
            <BottomSheetFooter {...props} bottomInset={24} style={styles.footerContainer}>
                {customFooter}
            </BottomSheetFooter>
        ),
        []
    )
    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            onChange={(index, position, type) => {
                console.log(index, 'Bottom sheet changed index')
                console.log(position, 'Bottom sheet changed position')

                console.log(type, 'Bottom sheet changed type')
            }}
            index={1}
            detached
            backdropComponent={renderBackdrop}
            bottomInset={insets.bottom}
            enableDynamicSizing
            snapPoints={sheetSnapPoints}
            style={styles.sheetContent}
            onDismiss={onClose}
            footerComponent={renderFooter}
            enablePanDownToClose>
            <BottomSheetView style={styles.bottomView}>{children}</BottomSheetView>
        </BottomSheetModal>
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
        borderRadius: borderRadius * 2,
        zIndex: 9,
        backgroundColor: 'white',
    },
    sheetContent: {
        marginHorizontal: 24,
    },
    bottomView: {
        flex: 1,
        borderRadius: borderRadius * 2,
        padding: padding * 3,
    },
    footerContainer: {
        padding: 12,
        margin: 12,
        borderRadius: 12,
    },
})
