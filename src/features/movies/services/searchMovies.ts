import { api } from "../../../shared/services/interception";
import type { SearchMoviesResponse } from "../types/movie.interface";

export const searchMovies = async (
    query: string,
    page: number = 1
): Promise<SearchMoviesResponse> => {
    try {
        const response = await api.get("", {
            params: {
                s: query,
                page,
                type: 'movie'
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        throw error;
    }
};

export const searchMovieById = async (id: string): Promise<any> => {
    try {
        const response = await api.get("", {
            params: {
                i: id,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
        throw error;
    }
};




