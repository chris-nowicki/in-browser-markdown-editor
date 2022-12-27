import { useContext } from 'react'
import { useRouter } from 'next/navigation'

// components
import Document from './Document'
import ToggleSwitch from './ToggleSwitch'

// Context
import { DataContext } from '../../contexts/DataContext'
import { useUser } from '@auth0/nextjs-auth0/client'

// Styles
import styles from './sidebar.module.scss'

function SideBar() {
    const { data } = useContext(DataContext)
    const { user, isLoading } = useUser()
    const router = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.myDocuments}>
                {isLoading ? (
                    <div>loading ...</div>
                ) : (
                    user && (
                        <div className={styles.user}>
                            <img
                                src={`${user.picture?.split('=')[0]}`}
                                alt={`${user.name}`}
                                width='150'
                            />
                            <h2>{`${user.given_name} ${user.family_name}`}</h2>
                            <p>{user.email}</p>
                        </div>
                    )
                )}
                <span className={styles.title}>MY DOCUMENTS</span>
                <button className={styles.newDocument}>+ New Document</button>
                <div className={styles.documentList}>
                    {data.map((data: string[], index: number) => (
                        <Document
                            key={index}
                            contentData={data}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.appActions}>
                <div className={styles.themSwitcher}>
                    <ToggleSwitch />
                </div>
                {user && (
                    <button
                        className={styles.logout}
                        onClick={() => router.push('/api/auth/logout')}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    )
}

export default SideBar
