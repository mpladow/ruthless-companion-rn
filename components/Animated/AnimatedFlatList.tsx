import React from 'react'
import { FlatList, FlatListProps, ListRenderItemInfo, Platform, ViewStyle } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

type AnimatedFlatListProps<T> = {
    // Define any props you need for your AnimatedFlatList
    data: T[]
    renderItem: (info: ListRenderItemInfo<T>) => React.ReactElement
    keyExtractor: (item: T, index: number) => string
    animationDuration?: number
    animationDelayStep?: number
    initialScale?: number
    finalScale?: number
    initialOpacity?: number
    finalOpacity?: number
    contentContainerStyle?: ViewStyle
} & Omit<FlatListProps<T>, 'data' | 'renderItem' | 'keyExtractor'>
const AnimatedFlatList = <T,>({
    data,
    renderItem,
    keyExtractor,
    animationDuration = 500,
    animationDelayStep = 100,
    initialScale = 0.95,
    finalScale = 1,
    initialOpacity = 0,
    finalOpacity = 1,
    ...rest
}: AnimatedFlatListProps<T>) => {
    const renderAnimatedItem = (info: ListRenderItemInfo<T>) => {
        //   const scale = useSharedValue(initialScale)
        //   const opacity = useSharedValue(initialOpacity)

        //   const animatedStyle = useAnimatedStyle(() => ({
        //       opacity: opacity.value,
        //       transform: [{ scale: scale.value }],
        //   }))

        return (
            <Animated.View
                key={info.index}
                entering={Platform.OS !== 'web' ? FadeIn : undefined}
                exiting={Platform.OS !== 'web' ? FadeOut : undefined}
                //  style={animatedStyle}
            >
                {renderItem(info)}
            </Animated.View>
        )
    }

    return <FlatList data={data} renderItem={renderAnimatedItem} keyExtractor={keyExtractor} {...rest} />
}

export default AnimatedFlatList
