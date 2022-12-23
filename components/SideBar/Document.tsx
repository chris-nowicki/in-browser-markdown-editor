import Image from 'next/image'

// Styles
import styles from './document.module.scss'

function Document() {
    return (
        <div className={styles.document}>
            <Image
                src='/icon-document.svg'
                width={14}
                height={16}
                alt='menu button to open/close sidebar menu'
            />
            <button>
                <span>01 April 2022</span>
                welcome.md
            </button>
        </div>
    )
}

export default Document
