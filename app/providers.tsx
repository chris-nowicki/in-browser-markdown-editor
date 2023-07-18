'use client'
import { DataProvider } from '@/contexts/DataContext'
import { AppProvider } from '@/contexts/AppContext'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<UserProvider>
			<DataProvider>
				<AppProvider>{children}</AppProvider>
			</DataProvider>
		</UserProvider>
	)
}
