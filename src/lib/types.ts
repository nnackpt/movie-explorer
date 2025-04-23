export interface Movie {
    id: number
    title: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    overview: string
    genre_ids: number[]
    genres?: Genre[]
}

export interface Genre {
    id: number
    name: string
}

export interface Credit {
    id: number
    name: string
    profile_path: string | null
    character?: string
    job?: string
}

export interface Cast extends Credit {
    character: string
    order: number
}

export interface Crew extends Credit {
    job: string
    department: string
}

export interface Credits {
    cast: Cast[]
    crew: Crew[]
}

export interface Video {
    id: string
    key: string
    name: string
    site: string
    type: string
}

export interface MovieDetails extends Movie {
    genres: Genre[]
    runtime: number
    status: string
    tagline: string
    credits?: Credits
    videos?: {
        results: Video[]
    }
    recommendations?: {
        results: Movie[]
    }
}

export interface ApiResponse<T> {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}