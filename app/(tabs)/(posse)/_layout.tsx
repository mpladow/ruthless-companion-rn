import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const PosseStackLayout = () => {
	return (
		<Stack>
			<Stack.Screen name='index' />
		</Stack>
	);
};

export default PosseStackLayout;

const styles = StyleSheet.create({});
