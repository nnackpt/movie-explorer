'use client'

import { useState } from "react"
import Image from "next/image"
import { MovieDetails, Video } from "@/lib/types"
import FavoriteButton from "./FavoriteButton"
import MovieRecommendations from './MovieRecommendations'
import TrailerModel from './ui/TrailerModal'

interface MovieDetailProps {
    movie: MovieDetails
}

export default function MovieDetail({ movie }: MovieDetailProps) {
    const [showTrailer, setShowTrailer] = useState(false)
    const [selectedTrailer, setSelectedTrailer] = useState<Video | null>(null)

    const trailers = movie.videos?.results.filter(
        (video) => video.site === 'YouTube' &&
        (video.type === 'Trailer' || video.type === 'Teaser')
    ) || []

    const director = movie.credits?.crew.find(
        (person) => person.job === 'Director'
    )

    const topCast = movie.credits?.cast.slice(0, 10) || []

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

    const backdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null

    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/placeholder.png'

    const handlePlayTrailer = (video: Video) => {
        setSelectedTrailer(video)
        setShowTrailer(true)
    }

    return (
        <>
            <div className="relative">
                {backdropPath && (
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src={backdropPath}
                            alt={movie.title}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/90 to-cyber-black/40" />
                        <div className="absolute inset-0 bg-cyber-black/70" />
                    </div>
                )}

                <div className="container mx-auto px-4 py-20 pt-32 md:pt-40 relative z-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-shrink-0 w-full max-w-xs mx-auto md:mx-0">
                            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border-2 border-cyber-blue/30 shadow-neon-blue">
                                <Image 
                                    src={posterPath}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="mt-4 flex justify-center space-x-2">
                                <FavoriteButton movie={movie} large />

                                {trailers.length > 0 && (
                                    <button
                                        onClick={() => handlePlayTrailer(trailers[0])}
                                        className="flex items-center justify-center space-x-2 bg-cyber-pink text-white rounded-md py-3 px-6 transition-all hover:bg-cyber-pink/80 flex-grow"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                        <span>Play Trailer</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {movie.release_date && (
                                    <span className="text-gray-400 text-sm">
                                        {new Date(movie.release_date).getFullYear()}
                                    </span>
                                )}

                                {movie.runtime > 0 && (
                                    <span className="text-gray-400 text-sm">
                                        • {formatRuntime(movie.runtime)}
                                    </span>
                                )}

                                {movie.vote_average > 0 && (
                                    <div className="bg-cyber-black/60 text-cyber-green border border-cyber-green/30 rounded-full px-2 py-1 text-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {(movie.vote_average * 10).toFixed(0)}%
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-4">{movie.title}</h1>

                            {movie.tagline && (
                                <p className="text-cyber-blue italic mb-6">{movie.tagline}</p>
                            )}

                            <div className="mb-6">
                                <h2 className="text-xl text-white mb-2">Overview</h2>
                                <p className="text-gray-300">{movie.overview}</p>
                            </div>

                            {movie.genres.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-xl text-whte mb-2">Genres</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="bg-cyber-dark border border-cyber-blue/30 text-gray-300 px-3 py-1 rounded-full text-sm"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {director && (
                                    <div>
                                        <h2 className="text-xl text-white mb-2">Director</h2>
                                        <div className="flex items-center space-x-3">
                                            {director.profile_path ? (
                                                <div className="w-12 h-12 rounded-full overflow-hidden border border-cyber-blue/30">
                                                    <Image 
                                                        src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                                                        alt={director.name}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-cyber-dark flex items-center justify-center border border-cyber-blue/30">
                                                    <span className="text-gray-400 text-lg">
                                                        {director.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            <span className="text-white">{director.name}</span>
                                        </div>
                                    </div>
                                )}

                                {topCast.length > 0 && (
                                    <div>
                                        <h2 className="text-xl text-white mb-2">Top Cast</h2>
                                        <div className="grid grid-cols-2 gap-2">
                                            {topCast.slice(0, 4).map((actor) => (
                                                <div key={actor.id} className="flex items-center space-x-2">
                                                    {actor.profile_path ? (
                                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-cyber-blue/30">
                                                            <Image 
                                                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                                                alt={actor.name}
                                                                width={32}
                                                                height={32}
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-cyber-dark flex items-center justify-center border border-cyber-blue/30">
                                                            <span className="text-gray-400 text-xs">
                                                                {actor.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <span className="text-white text-sm">{actor.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {topCast.length > 4 && (
                                            <p className="text-cyber-blue text-sm mt-2 cursor-pointer hover:underline">
                                                +{topCast.length - 4} more
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {movie.recommendations?.results.length > 0 && (
                <div className="container mx-auto px-4 py-12">
                    <MovieRecommendations movie={movie.recommendations.results} />
                </div>
            )}

            {showTrailer && selectedTrailer && (
                <TrailerModel 
                    video={selectedTrailer}
                    onClose={() => setShowTrailer(false)}
                />
            )}
        </>
    )
}