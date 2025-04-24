'use client'

import { useState, useEffect } from "react"
import { getFavorites } from "@/lib/favorites"
import { Movie } from "@/lib/types"
import MovieGrid from "@/components/ui/MovieGrid"

export default function FavoritesPage() {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

    useEffect(() => {
        const movies = getFavorites()
        setFavoriteMovies(movies)

        const handleStorageChange = () => {
            setFavoriteMovies(getFavorites())
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('favoritesUpdated', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('favoritesUpdated', handleStorageChange)
        }
    }, [])

    return (
        <main className="min-h-screen bg-cyber-black pt-24">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-cyber font-bold text-white mb-8 border-l-4 border-cyber-pink pl-4">
                    Your Favorite Movies
                </h1>

                {favoriteMovies.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-cyber-blue text-8xl mb-4">❤</div>
                        <h2 className="text-2xl text-white mb-4">Your favorites list is empty</h2>
                        <p className="text-gray-400 mb-8">
                            Start exploring and add movies to your favorites.
                        </p>
                    </div>
                ) : (
                    <MovieGrid movies={favoriteMovies} />
                )}
            </div>
        </main>
    )
}