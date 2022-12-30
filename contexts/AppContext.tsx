import { createContext, useState, useMemo } from 'react'

// Types
import { AppContextTypes } from '../types'

// Create Context
export const AppContext = createContext<AppContextTypes>({
    showMenu: false,
    setShowMenu: () => null,
    theme: '',
    setTheme: () => null,
    isChecked: false,
    setIsChecked: () => null,
    previewMode: false,
    setPreviewMode: () => null,
})

export function AppProvider({ children }: { children: JSX.Element }) {
    const [showMenu, setShowMenu] = useState(false)
    const [theme, setTheme] = useState('')
    const [isChecked, setIsChecked] = useState(true)
    const [previewMode, setPreviewMode] = useState(false)

    useMemo(() => (isChecked ? setTheme('') : setTheme('dark')), [isChecked])

    const value: AppContextTypes = useMemo(
        () => ({
            showMenu,
            setShowMenu,
            theme,
            setTheme,
            isChecked,
            setIsChecked,
            previewMode,
            setPreviewMode,
        }),
        [showMenu, theme, isChecked, previewMode]
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
