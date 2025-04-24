import { Movie } from '@/lib/types';
import MovieGrid from './ui/MovieGrid';

interface MovieRecommendationsProps {
  movies: Movie[];
}

export default function MovieRecommendations({ movies }: MovieRecommendationsProps) {
  if (!movies || movies.length === 0) return null
  
  const slicedMovies = movies.slice(0, 10);
  
  return (
    <MovieGrid 
      movies={slicedMovies} 
      title="You May Also Like" 
    />
  );
}