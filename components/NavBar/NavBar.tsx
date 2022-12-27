import { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'

// Context
import { AppContext } from '../../contexts/AppContext'
import { DataContext } from '../../contexts/DataContext'

// Styles
import styles from './navbar.module.scss'

const myLoader = ({
    src,
    width,
    quality,
}: {
    src: string
    width: number
    quality: number
}) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

function NavBar() {
    const { showMenu, setShowMenu } = useContext(AppContext)
    const { data, currentIndex } = useContext(DataContext)
    const { user } = useUser()
    const router = useRouter()

    return (
        <div className={styles.container}>
            <div className={styles.menuLogoDocument}>
                {/* show menu button */}
                <button onClick={() => setShowMenu((prev: any) => !prev)}>
                    {showMenu ? (
                        <Image
                            src='/icon-close.svg'
                            width={24}
                            height={24}
                            alt='menu button to open/close sidebar menu'
                        />
                    ) : (
                        <Image
                            src='/iconMenu.svg'
                            width={30}
                            height={18}
                            alt='menu button to open/close sidebar menu'
                        />
                    )}
                </button>

                {/* app logo */}
                <div className={styles.logo}>
                    <Image
                        src='/logo.svg'
                        width={130}
                        height={12}
                        alt='markdown app logo'
                    />
                </div>

                {/* document name */}
                <div className={styles.document}>
                    <Image
                        src='/icon-document.svg'
                        width={14}
                        height={16}
                        alt='markdown app logo'
                    />
                    <div className={styles.name}>
                        <label>Document Name</label>
                        <input type='text' value={data[currentIndex].name} />
                    </div>
                </div>
            </div>

            {/* delete / save button or Login */}
            <div className={styles.actions}>
                {user && (
                    <>
                        <button className={styles.deleteDocument}>
                            <svg
                                width='18'
                                height='20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    className={styles.deleteIcon}
                                    d='M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z'
                                    fill='#7C8187'
                                />
                            </svg>
                        </button>
                        <button className={styles.saveDocument}>
                            <Image
                                src='/icon-save.svg'
                                width={17}
                                height={17}
                                alt='markdown app logo'
                            />
                            Save Changes
                        </button>
                    </>
                )}

                {!user && (
                    <button
                        className={styles.login}
                        onClick={() => router.push('/api/auth/login')}
                    >
                        Login
                        <Image
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

export default NavBar