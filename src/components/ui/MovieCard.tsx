'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Movie } from "@/lib/types"
import FavoriteButton from '../FavoriteButton'

interface MovieCardProps {
    movie: Movie
    priority? : boolean
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'TBA'
    
    const imagePath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/placeholder.png'

    return (
        <div
            className="relative group rounded-lg overflow-hidden bg-cyber-dark border border-cyber-dark transition-all duration-300 hover:border-cyber-blue/50 hover:shadow-neon-blue"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/movie/${movie.id}`} className="block aspect-[2/3] relative">
                <Image 
                    src={imagePath}
                    alt={movie.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={priority}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`} />

                {movie.vote_average > 0 && (
                    <div className="absolute top-2 right-2 bg-cyber-black/80 text-cyber-green border border-cyber-green/30 rounded-full w-10 h-10 flex items-center justify-center font-cyber text-sm">
                        {(movie.vote_average * 10).toFixed(0)}%
                    </div>
                )}

                <div className={`absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="space-y-1">
                        <h3 className="font-cyber text-md text-white line-clamp-2">
                            {movie.title}
                        </h3>
                        <p className="text-sm text-gray-300">{releaseYear}</p>
                        <p className="text-xs text-gray-400 line-clamp-2">{movie.overview}</p>
                    </div>
                </div>
            </Link>

            <div className="absolute top-2 left-2 z-10">
                <FavoriteButton movie={movie} />
            </div>
        </div>
    )
}