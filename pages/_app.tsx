import { DataProvider } from '../contexts/DataContext'
import { AppProvider } from '../contexts/AppContext'
import { UserProvider } from '@auth0/nextjs-auth0/client'

console.log(process.env.DOMAIN)

// Styles
import '../styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <DataProvider>
                <AppProvider>
                    <Component {...pageProps} />
                </AppProvider>
            </DataProvider>
        </UserProvider>
    )
}
