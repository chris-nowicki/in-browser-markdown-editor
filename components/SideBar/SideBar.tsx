import { useContext } from 'react'
// components
import Document from './Document'
import ToggleSwitch from './ToggleSwitch'

// Context
import { AppContext } from '../../contexts/AppContext'

// Styles
import styles from './sidebar.module.scss'

function SideBar() {
    const { handleTheme } = useContext(AppContext)
    return (
        <div className={styles.container}>
            <div className={styles.myDocuments}>
                <span className={styles.title}>MY DOCUMENTS</span>
                <button className={styles.newDocument}>+ New Document</button>
                <div className={styles.documentList}>
                    <Document />
                </div>
            </div>
            <div className={styles.themSwitcher}>
                <ToggleSwitch />
            </div>
        </div>
    )
}

export default SideBar
