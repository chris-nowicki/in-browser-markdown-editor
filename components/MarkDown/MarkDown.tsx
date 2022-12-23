import { useContext, useState } from 'react'

// Markdown Libraries
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Contexts
import { DataContext } from '../../contexts/DataContext'
import { AppContext } from '../../contexts/AppContext'

// fonts
import { Roboto_Slab, Roboto_Mono } from '@next/font/google'
const slab = Roboto_Slab({
    variable: '--slab',
})
const mono = Roboto_Mono({
    variable: '--mono',
})

// styles
import styles from './markdown.module.scss'

function MarkDown() {
    const { content, setContent } = useContext(DataContext)
    const { theme } = useContext(AppContext)

    return (
        <main className={`${styles.container} ${styles[theme]}`}>
            {/* markdown editor pane */}
            <div className={`${styles.markdown} ${mono.variable} font-mono`}>
                <div className={`${styles.header} ${styles.mdHeader}`}>
                    <span>MARKDOWN</span>
                </div>
                <textarea
                    defaultValue={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            {/* markdown preview pane */}
            <div className={`${styles.preview} `}>
                <div className={styles.header}>
                    <span>PREVIEW</span>
                    <svg
                        width='16'
                        height='12'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M7.784.003c4.782-.144 7.597 4.31 8.109 5.198a.8.8 0 0 1 0 .8c-.688 1.2-3.255 5.086-7.677 5.198h-.2c-4.71 0-7.405-4.326-7.909-5.198a.8.8 0 0 1 0-.8C.803 4.001 3.362.115 7.784.003Zm.38 1.6h-.3c-3.199.08-5.286 2.71-6.086 3.998C2.482 6.73 4.73 9.68 8.176 9.6c3.199-.08 5.262-2.711 6.086-3.999-.712-1.127-2.967-4.086-6.398-3.998ZM8 2.803A2.799 2.799 0 1 1 8 8.4a2.799 2.799 0 0 1 0-5.598Zm0 1.599A1.2 1.2 0 1 0 8 6.8a1.2 1.2 0 0 0 0-2.4Z'
                            fill='#7C8187'
                        />
                    </svg>
                </div>
                <div
                    className={`${styles.previewText} ${slab.variable} font-sans ${styles[theme]}`}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </main>
    )
}

export default MarkDown
