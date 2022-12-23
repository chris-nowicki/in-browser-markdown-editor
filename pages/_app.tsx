import { DataProvider } from '../contexts/DataContext'
import { AppProvider } from '../contexts/AppContext'

// Styles
import '../styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DataProvider>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </DataProvider>
    )
}
