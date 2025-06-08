import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
	Extrapolate,
	interpolate,
	SharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'

type CarouselProps<T> = {
    data: T[]
    renderItem: (item: T, isSelected: boolean, index: number) => React.ReactNode
    itemWidth?: number
    itemSpacing?: number
    onSelect?: (item: T, index: number) => void
    initialIndex?: number
}

type AnimatedCardProps<T> = {
    item: T
    index: number
    selectedIndex: number
    onPress: (index: number) => void
    itemWidth: number
    itemSpacing: number
    scrollX: SharedValue<number>
    renderItem: (item: T, isSelected: boolean, index: number) => React.ReactNode
}

function AnimatedCard<T>({
    item,
    index,
    selectedIndex,
    onPress,
    itemWidth,
    itemSpacing,
    scrollX,
    renderItem,
}: AnimatedCardProps<T>) {
    const animatedStyle = useAnimatedStyle(() => {
        const center = index * (itemWidth + itemSpacing)
        const distance = Math.abs(scrollX.value - center)
        const scale = interpolate(distance, [0, itemWidth + itemSpacing], [1, 0.9], Extrapolate.CLAMP)
        const opacity = interpolate(distance, [0, itemWidth + itemSpacing], [1, 0.7], Extrapolate.CLAMP)
        return {
            transform: [{ scale }],
            opacity,
        }
    }, [scrollX, itemWidth, itemSpacing, index])

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(index)}
            style={{ width: itemWidth, marginRight: itemSpacing }}>
            <Animated.View style={[styles.card, animatedStyle]}>
                {renderItem(item, index === selectedIndex, index)}
            </Animated.View>
        </TouchableOpacity>
    )
}
const { width } = Dimensions.get('window')

export function AnimatedCarousel<T>({
    data,
    renderItem,
    itemWidth = width * 0.75,
    itemSpacing = 16,
    onSelect,
    initialIndex = 0,
}: CarouselProps<T>) {
    const flatListRef = useRef<FlatList>(null)
    const [selectedIndex, setSelectedIndex] = useState(initialIndex)

    const scrollX = useSharedValue(initialIndex * (itemWidth + itemSpacing))

    useEffect(() => {
        const offset = initialIndex * (itemWidth + itemSpacing)
        setTimeout(() => {
            flatListRef.current?.scrollToOffset({
                offset,
                animated: false,
            })
        }, 0)
        scrollX.value = offset
        setSelectedIndex(initialIndex)
        if (onSelect) onSelect(data[initialIndex], initialIndex)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMomentumScrollEnd = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x
        const index = Math.round(offsetX / (itemWidth + itemSpacing))
        if (index !== selectedIndex && data[index]) {
            setSelectedIndex(index)
            onSelect?.(data[index], index)
        }
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x
        },
    })

    const handleCardPress = (index: number) => {
        flatListRef.current?.scrollToOffset({
            offset: index * (itemWidth + itemSpacing),
            animated: true,
        })
        if (index !== selectedIndex && data[index]) {
            setSelectedIndex(index)
            onSelect?.(data[index], index)
        }
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={itemWidth + itemSpacing}
                decelerationRate="fast"
                //  contentContainerStyle={{
                //      paddingHorizontal: (width - itemWidth) / 2,
                //  }}
                contentContainerStyle={{
                    //   paddingRight: (width - itemWidth) / 2,
                    paddingLeft: (width - itemWidth) / 4,
                    //   paddingRight: 0,
                    paddingHorizontal: (width - itemWidth) / 2,
                }}
                keyExtractor={(_, idx) => idx.toString()}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => (
                    <AnimatedCard
                        key={index}
                        item={item}
                        index={index}
                        selectedIndex={selectedIndex}
                        onPress={handleCardPress}
                        itemWidth={itemWidth}
                        itemSpacing={itemSpacing}
                        scrollX={scrollX}
                        renderItem={renderItem}
                    />
                )}
                initialScrollIndex={initialIndex}
                getItemLayout={(_, index) => ({
                    length: itemWidth + itemSpacing,
                    offset: (itemWidth + itemSpacing) * index,
                    index,
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'pink',
    },
    card: {
        borderRadius: 16,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        flex: 1,
      //   justifyContent: 'center',
      //   alignItems: 'center',
    },
})

export default AnimatedCarousel
