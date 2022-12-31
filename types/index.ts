export interface DataContextTypes {
    data: any
    setData: (data: any) => void
    content: any
    setContent: (content: any) => void
    currentIndex: number
    setCurrentIndex: (currentIndex: number) => void
    deleteDocument: boolean
    setDeleteDocument: (deleteDocument: any) => void
    handleDeleteDocument: () => void
    handleSaveDocument: () => void
    handleDocumentNameChange: (e: any) => void
}

export interface AppContextTypes {
    showMenu: boolean
    setShowMenu: (menu: any) => void
    theme: string
    setTheme: (theme: any) => void
    isChecked: boolean
    setIsChecked: (isChecked: any) => void
    previewMode: boolean
    setPreviewMode: (previewMode: any) => void
}
