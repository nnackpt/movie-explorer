'use client'

import { useState, useEffect } from "react"
import { Movie } from "@/lib/types"
import { getTrendingMovies } from "@/lib/tmdb"
import MovieGrid from "./ui/MovieGrid"

export default function TrendingMovies() {
    const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day')
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true)
            try {
                const data = await getTrendingMovies(timeWindow)
                setMovies(data.results)
                setError(null)
            } catch (err) {
                setError('Failed to fetch trending movies')
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [timeWindow])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-pulse text-cyber-blue">Loading...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cyber text-white border-l-4 border-cyber-blue pl-4">
                    Trending Movies
                </h2>

                <div className="bg-cyber-black/60 rounded-lg overflow-hidden flex font-cyber">
                    <button
                        onClick={() => setTimeWindow('day')}
                        className={`px-4 py-2 text-sm ${
                            timeWindow === 'day'
                                ? 'bg-cyber-blue text-cyber-black'
                                : 'hover:bg-cyber-blue/20 text-gray-400' 
                        }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setTimeWindow('week')}
                        className={`px-4 py-2 text-sm ${
                            timeWindow === 'week'
                                ? 'bg-cyber-blue text-cyber-black'
                                : 'hover:bg-cyber-blue/20 text-gray-400' 
                        }`}
                    >
                        This Week
                    </button>
                </div>
            </div>

            <MovieGrid movies={movies} prioritizeFirst />
        </div>
    )
}