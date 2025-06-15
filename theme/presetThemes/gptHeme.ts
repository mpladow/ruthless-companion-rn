import { Theme, ThemeConfig } from '../types/type'

export const gptLightTheme: ThemeConfig = {
	name: "gptLightTheme",
	"isDark": false,
	"colors": {
		// primary: '#33658A',
		primary: '#7b1818',

		secondary: '#b79e51',
		secondaryLight: "#ceb998",
		// secondary: '#7b1818',
		background: '#ffffff',
		black: '#000000',
		white: '#ffffff',
		grey0: '#ededed',
		grey1: '#adadad',
		grey2: '#1d1d1d',
		greyOutline: '#878787',
		searchBg: '#D3D3D3',
		success: '#758E4F',
		warning: '#F6AE2D',
		error: '#F26419',
		textDefault: '#000000',
		textInverted: '#ffffff',
	}
}
export const gptDarkTheme: ThemeConfig = {
	name: "gptDarkTheme",
	"isDark": true,
	colors: {
		primary: '#33658A',
		secondary: '#362F18',
		secondaryLight: "#ebd5b3",
		background: '#363636',
		black: '#000000',
		white: '#ffffff',
		grey0: '#D3D3D3',
		grey1: '#878787',
		grey2: '#363636',
		greyOutline: '#878787',
		searchBg: '#D3D3D3',
		success: '#758E4F',
		warning: '#F6AE2D',
		error: '#F26419',
		textDefault: '#ffffff',
		textInverted: '#000000',
	}
}

export const gptTheme: Theme = {
	themeConfigs: [gptLightTheme, gptDarkTheme],
	fonts: []
}