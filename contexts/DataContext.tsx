import { createContext, useState, useMemo, use } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from 'axios'

// Types
import { DataContextTypes } from '../types'

// Load Default Data
import DATA from '../json/data.json'
const defaultData = DATA

// Create Context
export const DataContext = createContext<DataContextTypes>({
    data: null,
    setData: () => null,
    content: null,
    setContent: () => null,
    currentIndex: 1,
    setCurrentIndex: () => null,
})

export function DataProvider({
    children,
}: {
    children: JSX.Element
    userData: any
}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [data, setData] = useState<any>(defaultData)
    const [content, setContent] = useState(data.files[currentIndex].content)
    const { user } = useUser()

    useMemo(() => {
        user &&
            axios
                .post('http://localhost:3000/api/users/', {
                    id: user.sub,
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                })
                .then((res) => {
                    setData(res.data.data)
                    setContent(res.data.data.files[currentIndex].content)
                })
                .catch((err) => console.log(err))
    }, [user])

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
