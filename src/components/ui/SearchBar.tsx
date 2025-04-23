'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { searchMovies } from "@/lib/tmdb"
import { Movie } from "@/lib/types"
import { useDebounce } from "use-debounce"

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [debouncedQuery] = useDebounce(query, 500)
    const [suggestions, setSuggestions] = useState<Movie[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestionsRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (debouncedQuery.length >= 2) {
            const fetchSuggestions = async () => {
                try {
                    const data = await searchMovies(debouncedQuery)
                    setSuggestions(data.results.slice(0, 5))
                    setShowSuggestions(true)
                } catch (error) {
                    console.error('Error fetching suggestions:', error)
                }
            }

            fetchSuggestions()
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, [debouncedQuery])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (movieId: number) => {
        router.push(`/movie/${movieId}`)
        setShowSuggestions(false)
        setQuery('')
    }

    return (
        <div className="relative w-full" ref={suggestionsRef}>
            <form onSubmit={handleSubmit} className="relative">
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => debouncedQuery.length >= 2 && setShowSuggestions(true)}
                    className="w-full bg-cyber-black/60 border border-cyber-blue/30 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 focus:border-cyber-blue placeholder-gray-500"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyber-blue"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-cyber-dark border border-cyber-blue/30 rounded-md shadow-neon-blue overflow-hidden">
                    <ul>
                        {suggestions.map((movie) => (
                            <li key={movie.id} onClick={() => handleSuggestionClick(movie.id)} className="cursor-pointer py-2 px-4 hover:bg-cyber-blue/10 flex items-center space-x-2">
                                {movie.poster_path && (
                                    <div className="h-10 w-8 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement
                                                target.src = "/placeholder.png"
                                            }}
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-white truncate">{movie.title}</p>
                                    <p className="text-xs text-gray-400">
                                        {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}