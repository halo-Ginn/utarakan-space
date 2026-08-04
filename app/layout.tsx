import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/app/context/LanguageContext'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Utarakan.space — Ruang Pemulihan & Kesehatan Mental',
  description:
    'Utarakan.space adalah ruang peer-to-peer untuk berbagi, mengolah rasa, memulihkan hati, dan mencintai diri sendiri. A bilingual mental well-being platform.',
  keywords: ['mental health', 'kesehatan mental', 'peer support', 'Utarakan', 'well-being', 'Indonesia'],
  authors: [{ name: 'Utarakan.space' }],
  openGraph: {
    title: 'Utarakan.space',
    description: 'Ruang untuk berbagi, mengolah rasa, memulihkan hati.',
    type: 'website',
    locale: 'id_ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen" style={{ background: '#fcfbf7' }}><script dangerouslySetInnerHTML={{
        __html:
          "try{if(!sessionStorage.getItem('utarakan-foyer-seen')){var s=document.createElement('style');s.id='foyer-preload';s.textContent='body>*{visibility:hidden}';document.head.appendChild(s);setTimeout(function(){var e=document.getElementById('foyer-preload');if(e)e.remove()},4000)}}catch(e){}"
      }} />
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
