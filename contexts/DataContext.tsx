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
    deleteDocument: false,
    setDeleteDocument: () => null,
    handleDeleteDocument: () => null,
    handleSaveDocument: () => null
})

export function DataProvider({ children }: { children: JSX.Element }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [data, setData] = useState<any>(defaultData)
    const [content, setContent] = useState(data.files[currentIndex].content)
    const { user } = useUser()
    const [deleteDocument, setDeleteDocument] = useState(false)

    useMemo(() => {
        user &&
            axios
                .post('/api/users/', {
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

    const handleSaveDocument = () => {
        axios
            .put('/api/users/documents/save', {
                id: data.files[currentIndex]._id,
                name: data.files[currentIndex].name,
                content: content,
            })
            .then((res) => console.log(res.data.data))
            .catch((err) => console.log(err))
    }

    const handleDeleteDocument = () => {
        axios
            .put('/api/users/documents/delete', {
                id: user?.sub,
                mdxID: data.files[currentIndex]._id,
            })
            .then((res) => {
                setData(res.data.data)
                setCurrentIndex(0)
                setContent(res.data.data.files[0].content)
                setDeleteDocument(false)
            })
            .catch((err) => console.log(err))
    }

    const value: DataContextTypes = useMemo(
        () => ({
            data,
            setData,
            content,
            setContent,
            currentIndex,
            setCurrentIndex,
            deleteDocument,
            setDeleteDocument,
            handleDeleteDocument,
            handleSaveDocument
        }),
        [data, content, currentIndex, deleteDocument]
    )

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
