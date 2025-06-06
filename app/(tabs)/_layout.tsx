import { Tabs, useNavigation } from 'expo-router'
import React from 'react'

import { CustomTabBar } from '@/components/CustomTabbar/CustomTabBar'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    const navigation = useNavigation()
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
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
                //  header: (x) => {
                // 	console.log('dfdsf', x.route.name)
                //      const title = x.options.title || x.route.name
                //      console.log('🚀 ~ TabLayout ~ title:', title)
                //      return (
                //          <CustomHeader
                //              title={title}
                //              showBack={title !== 'Home'}
                //              rightComponent={
                //                  <Pressable onPress={() => console.log('Settings')}>
                //                      <ThemedText.Text>Settings</ThemedText.Text>
                //                  </Pressable>
                //              }
                //          />
                //      )
                //  },
            }}>
            <Tabs.Screen
                name="(scenarios)"
                options={{
                    title: 'Scenarios',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="dice" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="(posse)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome6 name="users" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <Entypo name="text-document" size={24} color={color} />,
                }}
            />
        </Tabs>
    )
}
