import CustomHeader from '@/components/ThemedHeader/ThemedHeader'
import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const EditorStack = () => {
	 return (
		  <Stack
				screenOptions={{
					 headerShown: true,
					 header: (x) => {
						  const title = x.options.title || x.route.name
						  return (
								<CustomHeader
									 title={title}
									 showBack={title !== 'Home'}
									 //  rightComponent={
									 //      <Pressable onPress={() => console.log('Settings')}>
									 //          <ThemedText.Text>Settings</ThemedText.Text>
									 //      </Pressable>
									 //  }
								/>
						  )
					 },
				}}
				initialRouteName="index">
				<Stack.Screen name="index" options={{ title: 'Add Posse Member' }} />
				<Stack.Screen name="editor" options={{ title: 'Create a Characterdfd' }} />
		  </Stack>
	 )
}

export default EditorStack

const styles = StyleSheet.create({})
