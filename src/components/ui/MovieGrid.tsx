import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
    movies: Movie[]
    title?: string
    prioritizeFirst?: boolean
}

export default function MovieGrid({ movies, title, prioritizeFirst = false }: MovieGridProps) {
    if (movies.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-xl text-gray-400">No movies found</h3>
            </div>
        )
    }

    return (
        <section className="my-8">
            {title && (
                <h2 className="text-2xl font-cyber text-white mb-6 border-l-4 border-cyber-pink pl-4">
                    {title}
                </h2>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={movie.id}
                        movie={movie}
                        priority={prioritizeFirst && index === 0}
                    />
                ))}
            </div>
        </section>
    )
}