import { Tabs, useNavigation } from 'expo-router'
import React from 'react'

import { CustomTabBar } from '@/components/CustomTabbar/CustomTabBar'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    const navigation = useNavigation()
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName='(posse)'
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
                    tabBarIcon: ({ color }) => <FontAwesome6 name="users" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(reference)/index"
                options={{
                    title: 'Reference',
                    tabBarIcon: ({ color }) => <Entypo name="text-document" size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}
