import { useContext } from 'react'
import Image from 'next/image'

// Context
import { DataContext } from '../../contexts/DataContext'

// Styles
import styles from './document.module.scss'

// Utils
import { convertDate } from '../../utils/dateHelper'

function Document({ contentData, index }: { contentData: any; index: number }) {
    const { currentIndex, setCurrentIndex, setContent, data } =
        useContext(DataContext)
    return (
        <div className={styles.document}>
            <Image
                src='/icon-document.svg'
                width={14}
                height={16}
                alt='menu button to open/close sidebar menu'
            />
            <button
                onClick={() => {
                    setCurrentIndex(index)
                    setContent(data.files[index].content)
                }}
            >
                <span>{convertDate(contentData.createdAt)}</span>
                {contentData.name}
            </button>
        </div>
    )
}

export default Document
