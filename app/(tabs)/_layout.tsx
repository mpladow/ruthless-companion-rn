import { Tabs, useNavigation } from 'expo-router'
import React from 'react'

import { CustomTabBar } from '@/components/CustomTabbar/CustomTabBar'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useTheme } from '@/theme/ThemeProvider'
import Entypo from '@expo/vector-icons/Entypo'
import Animated from 'react-native-reanimated'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    const navigation = useNavigation()
    const { currentTheme } = useTheme()
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName="(posse)"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: [
                    { backgroundColor: 'transparent', position: 'absolute', elevation: 0 },
                    //   Platform.select({
                    //       ios: {
                    //           // Use a transparent background on iOS to show the blur effect
                    //           position: 'absolute',
                    //       },
                    //       default: {},
                    //   }),
                ],
            }}>
            {/* <Tabs.Screen
                name="(scenarios)"
                options={{
                    title: 'Scenarios',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="dice" size={24} color={color} />,
                }}
            /> */}
            <Tabs.Screen
                name="(posse)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Animated.View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: color,
                                overflow: 'hidden',
                                width: 28,
                            }}>
                            <Animated.Image
                                source={require('../../assets/images/cowboy-f-rev.png')}
                                style={{ height: 24, width: 24, marginBottom: 0, marginLeft: -6, tintColor: color }}
                            />
                            <Animated.Image
                                source={require('../../assets/images/cowboy-m-rev.png')}
                                style={{ height: 24, width: 24, marginBottom: 0, marginLeft: -15, tintColor: color }}
                            />
                        </Animated.View>
                    ),
                    //   <FontAwesome6 name="users" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(reference)/index"
                options={{
                    title: 'Reference',
                    tabBarIcon: ({ color }) => <Entypo name="text-document" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(settings)"
                options={{
                    href: null,
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Entypo name="cog" size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}
