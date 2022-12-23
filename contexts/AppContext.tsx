import { createContext, useState, useMemo, use } from 'react'

// Types
import { AppContextTypes } from '../types'

// Create Context
export const AppContext = createContext<AppContextTypes>({
    showMenu: false,
    setShowMenu: () => null,
    theme: '',
    setTheme: () => null,
    handleTheme: () => null,
})

export function AppProvider({ children }: { children: JSX.Element }) {
    const [showMenu, setShowMenu] = useState(false)
    const [theme, setTheme] = useState('')

    const handleTheme = () => {
        let toggleTheme = ''
        theme == '' ? (toggleTheme = 'dark') : (toggleTheme = '')
        setTheme(toggleTheme)
    }

    const value: AppContextTypes = useMemo(
        () => ({
            showMenu,
            setShowMenu,
            theme,
            setTheme,
            handleTheme,
        }),
        [showMenu, theme]
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
