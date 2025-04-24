import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin' ]})

export const metadata: Metadata = {
  title: 'Movie Explorer | Cyberpunk Movie Database',
  description: 'Explorer trending and popular movies in an immersive cyberpunk experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap" />
      </head>
      <body className={`${inter.className} bg-cyber-black text-white`}>
        <Navbar />
        {children}
        <footer className="bg-cyber-dark border-t border-cyber-blue/20 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-400">
                  Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-cyber-blue hover:underline">TMDB API</a>
                </p>
              </div>
              <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Movie Explorer | Cyberpunk Edition
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}