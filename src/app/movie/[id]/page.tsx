import { getMovieDetails } from "@/lib/tmdb";
import MovieDetail from "@/components/MovieDetail";
import { notFound } from "next/navigation";

interface MoviePageProps {
    params: {
        id: string
    }
}

export default async function MoviePage({ params }: MoviePageProps) {
    try {
        const movie = await getMovieDetails(parseInt(params.id))

        return (
            <main className="min-h-screen bg-cyber-black">
                <MovieDetail movie={movie} />
            </main>
        )
    } catch (error) {
        console.error('Error fetching movie details:', error)
        notFound()
    }
}