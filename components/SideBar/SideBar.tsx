'use client'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'

// components
import Document from './Document'
import ToggleSwitch from './ToggleSwitch'

// Context
import { DataContext } from '../../contexts/DataContext'
import { useUser } from '@auth0/nextjs-auth0/client'

// Styles
import styles from './sidebar.module.scss'

function SideBar() {
    const { data, setData, setCurrentIndex, setContent } =
        useContext(DataContext)
    const { user, isLoading } = useUser()
    const router = useRouter()

    const handleNewDocument = () => {
        axios
            .put('/api/users/documents/new', {
                id: user?.sub,
            })
            .then((res) => {
                console.log(res.data.data.files)
                setData(res.data.data)
                setCurrentIndex(0)
                setContent(res.data.data.files[0].content)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={styles.container}>
            <div className={styles.myDocuments}>
                {/* app logo */}
                <div className={styles.logo}>
                    <Image
                        src='/logo.svg'
                        width={130}
                        height={12}
                        alt='markdown app logo'
                    />
                </div>
                {isLoading ? (
                    <div>loading ...</div>
                ) : (
                    user && (
                        <div className={styles.user}>
                            <Image
                                src={`${user.picture?.split('=')[0]}`}
                                width={150}
                                height={150}
                                alt='profile picture'
                            />
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    )
                )}
                <span className={styles.title}>MY DOCUMENTS</span>
                {user && (
                    <button
                        className={styles.newDocument}
                        onClick={() => handleNewDocument()}
                    >
                        + New Document
                    </button>
                )}
                <div className={styles.documentList}>
                    {data.files.map((data: string[], index: number) => (
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
                        className={styles.userButton}
                        onClick={() => router.push('/api/auth/logout')}
                    >
                        Logout
                    </button>
                )}
                {!user && (
                    <button
                        className={styles.userButton}
                        onClick={() => router.push('/api/auth/login')}
                    >
                        Login
                        <Image
                            className={styles.icon}
                            src='/log-in-outline.svg'
                            width={24}
                            height={24}
                            alt='login'
                        />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SideBar
