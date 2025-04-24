'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { searchMovies } from "@/lib/tmdb"
import MovieGrid from "@/components/ui/MovieGrid"
import GenreSelector from "@/components/ui/GenreSelector"
import { Movie } from "@/lib/types"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')

    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (query) {
            const fetchMovies = async () => {
                setIsLoading(true)
                try {
                    const data = await searchMovies(query)
                    setMovies(data.results)
                    setError(null)
                } catch (err) {
                    setError('Failed to search movies')
                    console.error(err)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchMovies()
        }
    }, [query])

    return (
        <main className="min-h-screen bg-cyber-black pt-24">
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-3xl font-cyber font-bold text-white mb-6 border-l-4 border-cyber-blue pl-4">
                        {query ? `Search Results: "${query}"` : 'Browse Movies by Genre'}
                    </h1>

                    {!query && <GenreSelector />}

                    {query && isLoading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-pulse text-cyber-blue">Searching...</div>
                        </div>
                    )}

                    {query && error && (
                        <div className="text-center py-12">
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}

                    {query && !isLoading && !error && (
                        <MovieGrid 
                            movies={movies}
                            title={movies.length > 0 ? undefined : "No movies found"}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}