import type { RouteRecordRaw } from "vue-router";
import Movies from "../pages/Movies.vue";
import MovieDetais from "../pages/MovieDetais.vue";


export const moviesRoutes: RouteRecordRaw[] = [
    {
        path: "/movies",
        name: "Filmes",
        component: Movies,
    },
    {
        path: "/movies/rental/:id",
        name: "Aluguel",
        component: MovieDetais,
    },
]