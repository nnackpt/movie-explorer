import { getMoviesByGenre, getGenres } from '@/lib/tmdb';
import MovieGrid from '@/components/ui/MovieGrid';
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: {
    id: string;
  };
}

export default async function GenrePage({ params }: GenrePageProps) {
  try {
    const genreId = parseInt(params.id);
    
    const moviesData = await getMoviesByGenre(genreId);
    
    const genresData = await getGenres();
    const genre = genresData.genres.find(g => g.id === genreId);
    
    if (!genre) {
      notFound();
    }
    
    return (
      <main className="min-h-screen bg-cyber-black pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-cyber font-bold text-white mb-8 border-l-4 border-cyber-pink pl-4">
            {genre.name} Movies
          </h1>
          
          <MovieGrid movies={moviesData.results} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching genre page:', error);
    notFound();
  }
}