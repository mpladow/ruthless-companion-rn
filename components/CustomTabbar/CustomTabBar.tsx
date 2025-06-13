import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useRouter } from 'expo-router'
import { Platform, Pressable, useWindowDimensions, View } from 'react-native'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { currentTheme } = useTheme()
    const insets = useSafeAreaInsets()
    const dimensions = useWindowDimensions()
    const router = useRouter()
    const isHome =
        state.routes.find((x) => x.name == '(posse)')?.state?.index == (0 || undefined) || !router.canGoBack()
    console.log('🚀 ~ CustomTabBar ~  state.routes:', state.routes.find((x) => x.name == '(posse)')?.state?.index)
    console.log('🚀 ~ CustomTabBar ~ isHome:', isHome)
    const NAVBAR_HEIGHT = 46
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            {!isHome && (
                <Animated.View
                    entering={Platform.OS !== 'web' ? FadeInRight.duration(200) : undefined}
                    exiting={Platform.OS !== 'web' ? FadeOutRight.duration(200) : undefined}>
                    <Pressable
                        onPress={() => router.back()}
                        style={{
                            width: NAVBAR_HEIGHT,
                            height: NAVBAR_HEIGHT,
                            backgroundColor: currentTheme.colors.grey2,
                            marginBottom: Platform.OS == 'android' ? 30 : insets.bottom,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            left: dimensions.width * 0.1,
                            bottom: insets.bottom - 20,
                            borderRadius: 40,
                        }}>
                        <Entypo name="chevron-thin-left" size={20} color={currentTheme.colors.textInverted} />
                    </Pressable>
                </Animated.View>
            )}
            <View
                style={[
                    {
                        marginBottom: Platform.OS == 'android' ? 30 : insets.bottom,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        bottom: insets.bottom - 20,
                        marginLeft: dimensions.width * 0.3,
                        flexDirection: 'row',
                    },
                ]}>
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            height: NAVBAR_HEIGHT,
                            backgroundColor: '#111',
                            width: dimensions.width / 2.5,
                            borderRadius: 30,
                        },
                    ]}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key]
                        const label = options.tabBarLabel ?? options.title ?? route.name

                        const isFocused = state.index === index

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            })

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name)
                            }
                        }

                        return (
                            <Pressable
                                key={route.key + index}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                onPress={onPress}
                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {options.tabBarIcon &&
                                    options.tabBarIcon({
                                        focused: isFocused,
                                        color: isFocused ? currentTheme.colors.textInverted : '#aaa',
                                        size: 16,
                                    })}
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}
