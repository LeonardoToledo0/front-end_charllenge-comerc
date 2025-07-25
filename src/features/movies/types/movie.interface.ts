export interface BaseMovies {
    id: string
    title: string
    image: string
    year: string
    type: string
    rating: number
    price: number
}
export interface SearchMoviesResponse {
    Response: "True" | "False";
    Search?: any[];
    totalResults?: string;
    Error?: string;
}
export interface Movie {
    id?: string
    imdbID?: string
    Title: string
    Year: string
    Genre: string
    Plot: string
    Actors: string
    Director: string
    Poster: string
    Type: string

}
export let allMovies: Movie[] = []