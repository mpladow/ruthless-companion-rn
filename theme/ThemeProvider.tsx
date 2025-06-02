import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react'

import { gptLightTheme, gptTheme } from './presetThemes/gptHeme'
import { Theme, ThemeContextType } from './types/type'

type ThemeProviderType = {
        defaultTheme: Theme
        additionalThemes?: Theme[]
} & PropsWithChildren

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

const ThemeProvider = ({ defaultTheme, additionalThemes: additioinal, children }: ThemeProviderType) => {
        const [loading, setLoading] = useState(false)
        const DEFAULT_THEME = gptTheme
        const [themeSet, setThemeSet] = useState<Theme>(defaultTheme ?? DEFAULT_THEME)

        // const [additionalThemes, setAdditionalThemes] = useState<Theme[]>(additioinal ? [defaultTheme, ...additioinal] : [defaultTheme])
        const [isDarkMode, setIsDarkMode] = useState(false)

        const additionalThemes = useMemo(() => {
                return additioinal ? [defaultTheme, ...additioinal] : [defaultTheme]
        }, [additioinal])

        const handleThemeSet = async (themeName: string) => {
                const foundTheme = additionalThemes?.find((x) => x.themeConfigs.find((x) => x.name == themeName))
                if (foundTheme) {
                        setThemeSet(foundTheme)
                }
        }

        const toggleDarkMode = (dark: boolean) => {
                setIsDarkMode(dark)
                // set the dark mode equivalent for the selected theme.
        }

        const currentTheme = useMemo(() => {
                return (
                        themeSet.themeConfigs.find((x) => x.isDark == isDarkMode) ??
                        themeSet.themeConfigs[0] ??
                        gptLightTheme
                )
        }, [isDarkMode])

        const currentFont = useMemo(() => {
                return themeSet.fonts ?? DEFAULT_THEME.fonts
        }, [themeSet])

        return (
                <ThemeContext.Provider
                        value={{
                                currentTheme,
                                currentFontFamilies: currentFont,
                                handleThemeSet,
                                toggleDarkMode,
                        }}
                >
                        {children}
                </ThemeContext.Provider>
        )
}

export default ThemeProvider

export const useTheme = () => {
        const context = useContext(ThemeContext)
        return context
}
