import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css'

// font
import { Roboto } from 'next/font/google'

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
  style: ['normal'],
  subsets: ['latin-ext'],
	variable: '--roboto-font',
})

// meta data
export function generateMetadata(): Metadata {
	return {
		title: 'In-Browser Markdown Editor',
		description:
			'Markdown editor built with NextJS, auth0, and MongoDB. Coded by Chris Nowicki',
		openGraph: {
			type: 'website',
			title: 'In-Browser Markdown Editor',
			description:
				'Markdown editor built with NextJS, auth0, and MongoDB. Coded by Chris Nowicki',
			url: 'https://markdown.chrisnowicki.io',
			images: [
				{
					url: 'https://markdown.chrisnowicki.io/preview.png',
					width: 1920,
					height: 1080,
				},
			],
			locale: 'en-US',
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		twitter: {
			title: 'In-Browser Markdown Editor',
			card: 'summary_large_image',
		},
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
