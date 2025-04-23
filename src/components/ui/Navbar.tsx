'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SearchBar from './SearchBar'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-cyber-drak/95 backdrop-blur-md shadow-neon-blue'
                    : 'bg-transparent' 
            }`}
        >
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                    <Link href="/" className="text-3xl font-cyber font-bold tracking-wider">
                        <span className="text-cyber-blue">MOVIE</span>
                        <span className="text-cyber-pink">EXPLORER</span>
                    </Link>
                </div>

                <div className="w-full md:w-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-64">
                        <SearchBar />
                    </div>

                    <div className="flex space-x-6">
                        <Link
                            href="/"
                            className={`font-cyber text-sm uppercase tracking-wide hover:text-cyber-blue transition-colors ${
                                pathname === '/' ? 'text-cyber-blue' : 'text-gray-300'
                            }`}
                        >
                            Trending
                        </Link>
                        <Link
                            href="/search"
                            className={`font-cyber text-sm uppercase tracking-wide hover:text-cyber-blue transition-colors ${
                                pathname === '/search' ? 'text-cyber-blue' : 'text-gray-300'
                            }`}
                        >
                            Browse
                        </Link>
                        <Link
                            href="/favorites"
                            className={`font-cyber text-sm uppercase tracking-wide hover:text-cyber-pink transition-colors ${
                                pathname === '/favorites' ? 'text-cyber-pink' : 'text-gray-300'
                            }`}
                        >
                            Favorites
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}