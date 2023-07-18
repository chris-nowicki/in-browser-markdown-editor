'use client'
import { useContext } from 'react'
import styles from './page.module.scss'


// components
import NavBar from '@/components/NavBar/NavBar'
import SideBar from '@/components/SideBar/SideBar'
import MarkDown from '@/components/MarkDown/MarkDown'
import DeleteModal from '@/components/DeleteModal/DeleteModal'

// context
import { AppContext } from '@/contexts/AppContext'
import { DataContext } from '@/contexts/DataContext'

export default function Home() {
	const { showMenu } = useContext(AppContext)
	const { deleteDocument } = useContext(DataContext)

	return (
		<main className={styles.appWrapper}>
			{showMenu && <SideBar />}
			<div className={styles.appContainer}>
				<NavBar />
				<MarkDown />
				{deleteDocument && <DeleteModal />}
			</div>
		</main>
	)
}
