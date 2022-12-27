import { createContext, useState, useMemo, use } from 'react'

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
})

export function AppProvider({ children }: { children: JSX.Element }) {
    const [showMenu, setShowMenu] = useState(false)
    const [theme, setTheme] = useState('')
    const [isChecked, setIsChecked] = useState(true)

    useMemo(() => (isChecked ? setTheme('') : setTheme('dark')), [isChecked])

    const value: AppContextTypes = useMemo(
        () => ({
            showMenu,
            setShowMenu,
            theme,
            setTheme,
            isChecked,
            setIsChecked,
        }),
        [showMenu, theme]
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
