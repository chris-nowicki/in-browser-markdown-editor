'use client'
import { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { AppContext } from '../../contexts/AppContext'

// Styles
import styles from './DeleteModal.module.scss'

// Font
import { Roboto_Slab } from 'next/font/google'
const slab = Roboto_Slab({
    variable: '--slab-font',
    subsets: ['latin-ext'],
})

export default function DeleteModal() {
    const {
        deleteDocument,
        setDeleteDocument,
        handleDeleteDocument,
        data,
        currentIndex,
    } = useContext(DataContext)

    const { theme, showMenu } = useContext(AppContext)
    return (
        <div
            className={`${styles.container} ${
                theme == 'dark' ? styles.containerDark : styles.containerLight
            }`}
        >
            <div
                className={`${styles.modal} ${slab.variable} ${styles[theme]} ${
                    showMenu && styles.modalTranslate
                }`}
            >
                <h4>Delete this document?</h4>
                <p>
                    Are you sure you want to delete the ‘
                    <span>{data.files[currentIndex].name}</span>’ document and
                    its contents? This action cannot be reversed.
                </p>
                <button
                    className={styles.confirm}
                    onClick={() => handleDeleteDocument()}
                >
                    Confirm & Delete
                </button>
                <button
                    className={styles.cancel}
                    onClick={() => setDeleteDocument(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
