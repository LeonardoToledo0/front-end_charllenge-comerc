import { defineStore } from 'pinia'
import type { Movie } from '../types/movie.interface'
import { searchMovies } from '../services/searchMovies'

export const useMovieStore = defineStore('movies', {
    state: () => ({
        moviesByTitle: {} as Record<string, Movie[]>,
    }),

    actions: {
        async fetchMoviesByTitle(title: string): Promise<Movie[]> {
            if (this.moviesByTitle[title]) {
                return this.moviesByTitle[title]
            }
            try {
                const response = await searchMovies(title, 1)
                if (response.Response === 'True' && response.Search) {
                    this.moviesByTitle[title] = response.Search
                    return response.Search
                }
                this.moviesByTitle[title] = []
                return []
            } catch (error) {
                console.error('Erro buscando filmes:', error)
                this.moviesByTitle[title] = []
                return []
            }
        }
    }
})
