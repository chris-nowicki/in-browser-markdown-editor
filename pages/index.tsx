import { useContext } from 'react'
import Head from 'next/head'

// Components
import NavBar from '../components/NavBar/NavBar'
import SideBar from '../components/SideBar/SideBar'
import MarkDown from '../components/MarkDown/MarkDown'
import DeleteModal from '../components/DeleteModal/DeleteModal'

// Context
import { AppContext } from '../contexts/AppContext'
import { DataContext } from '../contexts/DataContext'

// Fonts
import { Roboto } from '@next/font/google'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal'],
    variable: '--roboto-font',
})

// Styles
import styles from './index.module.scss'

export default function Home() {
    const { showMenu } = useContext(AppContext)
    const { deleteDocument } = useContext(DataContext)

    return (
        <>
            <Head>
                <title>In-Browser Markdown Editor</title>

                {/* Meta Tags */}
                <meta
                    name='description'
                    content='Markdown editor built with NextJS, auth0, and MongoDB. Coded by Chris Nowicki'
                />
                <meta property='og:title' content='In-Browser Markdown App' />
                <meta name='author' content='Chris Nowicki' />
                <meta
                    property='og:url'
                    content='https://markdown.chrisnowicki.io'
                />
                <meta
                    property='og:image'
                    content='https://markdown.chrisnowicki.io/preview.png'
                />
                <meta property='twitter:card' content='summary_large_image' />

                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />

                {/* Favicon */}
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
            </Head>
            <div className={`${styles.appWrapper} ${roboto.variable}`}>
                {showMenu && <SideBar />}
                <div className={styles.appContainer}>
                    <NavBar />
                    <MarkDown />
                    {deleteDocument && <DeleteModal />}
                </div>
            </div>
        </>
    )
}
