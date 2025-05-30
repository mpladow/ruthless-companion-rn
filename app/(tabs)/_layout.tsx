import { Tabs, useNavigation } from 'expo-router'
import React from 'react'

import { CustomTabBar } from '@/components/CustomTabbar/CustomTabBar'
import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    const navigation = useNavigation()
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar showBack={props.navigation.canGoBack()} {...props} />}
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
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(posse)"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                }}
            />
        </Tabs>
    )
}
