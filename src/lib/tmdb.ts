import { ApiResponse, Movie, MovieDetails } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const fetchFromApi = async <T>(endpoint: string, params = {}): Promise<T> => {
    const queryParams = new URLSearchParams({
        api_key: API_KEY!,
        ...params,
    }).toString()

    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`)

    if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`)
    }

    return response.json() as Promise<T>
}

export const getTrendingMovies = (timeWindow: 'day' | 'week', language = 'en-US'): Promise<ApiResponse<Movie>> => {
    return fetchFromApi<ApiResponse<Movie>>(`/trending/movie/${timeWindow}`, { language })
}

export const getMovieDetails = (id: number, language = 'en-US'): Promise<MovieDetails> => {
    return fetchFromApi<MovieDetails>(`/movie/${id}`, {
        language,
        append_to_response: 'credits,videos,recommendations'
    })
}

export const searchMovies = (query: string, page = 1, language = 'en-US'): Promise<ApiResponse<Movie>> => {
    return fetchFromApi<ApiResponse<Movie>>('/search/movie', {
        query,
        page: page.toString(),
        language,
        include_adult: 'false'
    })
}

export const getMoviesByGenre = (genreId: number, page = 1, language = 'en-US'): Promise<ApiResponse<Movie>> => {
    return fetchFromApi<ApiResponse<Movie>>('/discover/movie', {
        with_genres: genreId.toString(),
        page: page.toString(),
        language,
        sort_by: 'popularity.desc'
    })
}

export const getGenres = (language = 'en-US'): Promise<{ genres: { id: number; name: string }[] }> => {
    return fetchFromApi<{ genres: { id: number; name: string }[] }>('/genre/movie/list', { language })
}