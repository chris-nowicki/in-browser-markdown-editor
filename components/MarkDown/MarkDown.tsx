'use client'
import { useContext } from 'react'

// Markdown Libraries
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Contexts
import { DataContext } from '../../contexts/DataContext'
import { AppContext } from '../../contexts/AppContext'

// Components
import Header from './Header'

// fonts
import { Roboto_Slab, Roboto_Mono } from 'next/font/google'
const slab = Roboto_Slab({
    variable: '--slab',
    subsets: ['latin-ext'],
})
const mono = Roboto_Mono({
    variable: '--mono',
    subsets: ['latin-ext'],
})

// styles
import styles from './markdown.module.scss'

function MarkDown() {
    const { content, setContent } = useContext(DataContext)
    const { theme, previewMode } = useContext(AppContext)

    return (
        <main className={`${styles.container} ${styles[theme]}`}>
            {/* markdown editor pane */}
            <div
                className={`${styles.markdown} ${mono.variable} font-mono ${
                    previewMode && styles.mdHide
                }`}
            >
                {/* header */}
                <Header name='markdown' hide={true} />

                {/* markdown edit text area */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            {/* markdown preview pane */}
            <div
                className={`${styles.preview} ${
                    previewMode && styles.previewOnly
                } `}
            >
                {/* header */}
                <Header name='preview' />

                {/* markdown preview text */}
                <div
                    className={`${styles.previewText} ${
                        slab.variable
                    } font-sans ${styles[theme]} ${
                        previewMode && styles.previewOnly_Text
                    }`}
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
