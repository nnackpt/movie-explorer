import { Movie } from "./types";

export const getFavorites = (): Movie[] => {
    if (typeof window === 'undefined') return []

    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
}

export const addFavorite = (movie: Movie): void => {
    const favorites = getFavorites()

    if (!favorites.some(fav => fav.id === movie.id)) {
        const updatedFavorites = [...favorites, movie]
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
}

export const removeFavorite = (movieId: number): void => {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
}

export const isFavorite = (movieId: number): boolean => {
    const favorites = getFavorites()
    return favorites.some(movie => movie.id === movieId)
}