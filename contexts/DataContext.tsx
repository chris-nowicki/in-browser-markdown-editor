import { createContext, useState, useMemo, use} from 'react'

// Types
import { DataContextTypes } from '../types'

// Load Default Data
import DATA from '../json/data.json'
const defaultData = DATA.slice()

// Create Context
export const DataContext = createContext<DataContextTypes>({
    data: null,
    setData: () => null,
    content: null,
    setContent: () => null,
    currentIndex: 1,
    setCurrentIndex: () => null,
})

export function DataProvider({ children }: { children: JSX.Element }) {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [data, setData] = useState<any>(defaultData)
    const [content, setContent] = useState(data[currentIndex].content)

    const value: DataContextTypes = useMemo(
        () => ({
            data,
            setData,
            content,
            setContent,
            currentIndex,
            setCurrentIndex,
        }),
        [data, content, currentIndex]
    )

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
