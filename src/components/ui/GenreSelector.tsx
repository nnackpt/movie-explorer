'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getGenres } from '@/lib/tmdb';
import { Genre } from '@/lib/types';

export default function GenreSelector() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGenres();
  }, []);
  
  const handleGenreClick = (genreId: number) => {
    router.push(`/genre/${genreId}`);
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="h-12 bg-cyber-dark rounded-lg"
          ></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {genres.map(genre => (
        <button
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          className="cursor-pointer group bg-cyber-dark border border-cyber-blue/20 rounded-lg p-4 transition-all duration-300 hover:border-cyber-blue hover:shadow-neon-blue text-left"
        >
          <span className="text-white group-hover:text-cyber-blue font-medium">
            {genre.name}
          </span>
        </button>
      ))}
    </div>
  );
}