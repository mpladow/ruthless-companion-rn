

export type ThemeContextType = {
	currentTheme: ThemeConfig;
	currentFontFamilies: fontConfig[];
	handleThemeSet: (theme: ThemeName) => void;
	toggleDarkMode: (dark: boolean) => void;
}


export type Theme = {
	themeConfigs: ThemeConfig[],
	fonts: fontConfig[];
}

export type ThemeConfig = {
	name: string,
	isDark: boolean,
	colors: {
		primary: string,
		secondary: string,
		background: string,
		black: string,
		white: string,
		grey0: string,
		grey1: string,
		grey2: string,
		greyOutline: string,
		searchBg: string,
		success: string,
		warning: string,
		error: string,
		textDefault: string,
		textInverted: string,
	}
}

export type FontType = "heading" | "primary" | "secondary"

export type ThemeName = "lightTheme" | "darkTheme"

export type fontConfig = {
	type: FontType,
	family: string,
	regular: {
		fontFamily: string;
	},
	regularItalic: {
		fontFamily: string;
	}
	medium: {
		fontFamily: string;
	},
	mediumItalic: {
		fontFamily: string;
	}
	bold: {
		fontFamily: string;
	},
	boldItalic: {
		fontFamily: string;
	}
}