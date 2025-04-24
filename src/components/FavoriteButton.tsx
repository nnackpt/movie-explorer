'use client'

import { useState, useEffect } from "react"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import { Movie } from "@/lib/types"

interface FavoriteButtonProps {
    movie: Movie
    large?: boolean
}

export default function FavoriteButton({ movie, large = false }: FavoriteButtonProps) {
    const [isFav, setIsFav] = useState(false)

    useEffect(() => {
        setIsFav(isFavorite(movie.id))
    }, [movie.id])

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isFav) {
            removeFavorite(movie.id)
        } else {
            addFavorite(movie)
        }

        setIsFav(!isFav)
    }

    return (
        <button
            onClick={toggleFavorite}
            className={`${large ? 'p-3' : 'p-2'} rounded-full transition-all duration-300 ${
                isFav
                    ? 'bg-cyber-pink/20 text-cyber-pink hover:bg-cyber-pink/30'
                    : 'bg-cyber-black/60 text-gray-400 hover:text-cyber-pink hover:bg-cyber-black/80' 
            }`}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFav ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={large ? 'w-6 h-6' : 'w-4 h-4'}
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        </button>
    )
}