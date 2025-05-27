import { useTheme } from '@/theme/ThemeProvider';
import React from 'react';
import {
	StyleSheet
} from 'react-native';
import {
	SafeAreaView,
	SafeAreaViewProps,
} from 'react-native-safe-area-context';

export type StyledSafeAreaViewProps =
	{} & SafeAreaViewProps;
const StyledSafeAreaView = ({
	children,
}: StyledSafeAreaViewProps) => {
	const { currentTheme } =
		useTheme();
	return (
		<SafeAreaView
			style={[
				{
					backgroundColor:
						currentTheme
							.colors
							.background,
				},
				styles.default,
			]}
		>
			{children}
		</SafeAreaView>
	);
};

export default StyledSafeAreaView;

const styles = StyleSheet.create({
	default: {
		flex: 1,
	},
});
