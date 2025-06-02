import { PropsWithChildren } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

type AccordionItemType = {
    isExpanded: SharedValue<boolean>
    viewKey: string
    invertExpanded?: boolean
    style?: ViewStyle
    duration?: number
} & PropsWithChildren
const AnimatedAccordion = ({
    isExpanded,
    children,
    viewKey,
    style,
    invertExpanded,
    duration = 500,
}: AccordionItemType) => {
    const height = useSharedValue(0)

    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value * Number(invertExpanded ? !isExpanded.value : isExpanded.value), {
            duration,
        })
    )
    const bodyStyle = useAnimatedStyle(() => ({
        height: derivedHeight.value,
    }))

    return (
        <Animated.View key={`accordionItem_${viewKey}`} style={[styles.animatedView, bodyStyle, style]}>
            <View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height
                }}
                style={styles.wrapper}>
                {children}
            </View>
        </Animated.View>
    )
}
export default AnimatedAccordion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
    },
    animatedView: {
        width: '100%',
        overflow: 'hidden',
    },
    box: {
        height: 120,
        width: 120,
        color: '#f8f9ff',
        backgroundColor: '#b58df1',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
