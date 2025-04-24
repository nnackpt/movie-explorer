import TrendingMovies from "@/components/TrendingMovies";
import { getPopularMovies } from '@/lib/tmdb'
import MovieGrid from "@/components/ui/MovieGrid";

export default async function HomePage() {
  const popularMovies = await getPopularMovies()

  return (
    <main className="min-h-screen bg-cyber-black pt-24">
      <section className="bg-cyber-dark border-b border-cyber-blue/20 relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 z-10 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-cyber font-bold mb-4">
              <span className="text-cyber-blue">EXPLORE THE</span><br />
              <span className="text-cyber-pink">CINEMA UNIVERSE</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Discover thousands of movies, watch trailers, and save your favorites all in one place. Your cybernetic guide to the film universe.
            </p>
          </div>
        </div>

        <div className="absolute -bottom-10 right-0 w-1/3 h-64 bg-cyber-blue/10 blur-3xl z-0" />
        <div className="absolute top-20 right-40 w-20 h-20 border border-cyber-pink rotate-45 opacity-20" />
        <div className="absolute bottom-40 right-60 w-40 h-40 border-2 border-cyber-blue rotate-12 opacity-20" />
      </section>

      <div className="container mx-auto px-4 py-12">
        <TrendingMovies />
        <MovieGrid 
          movies={popularMovies.results}
          title="Popular Movies"
        />
      </div>
    </main>
  )
}