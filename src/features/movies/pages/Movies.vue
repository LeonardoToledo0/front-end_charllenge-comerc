<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import SearchInput from '../../../shared/components/SearchInput.vue'
import MovieCards from '../components/MovieCards.vue'
import SkeletonMovieCards from '../components/SkeletonMoviecards.vue'

import { searchValue, searchType, rows, filteredRows } from '../../../shared/utils/serchFilters'
import { useMovieStore } from '../stores/useMovieStore'
import type { BaseMovies, Movie } from '../types/movie.interface'

const isLoading = ref(true)
const router = useRouter()
const movieStore = useMovieStore()

searchType.value = 'movies'

const defaultTitles = [
    'Batman', 'Superman', 'Spiderman', 'Avengers', 'Iron Man',
    'Fast and Furious', 'The Hobbit', 'The Lord of the Rings', 'The Matrix',
    'Jurassic Park', 'Star Wars', 'Harry Potter', 'Pirates of the Caribbean',
    'The Dark Knight', 'Inception', 'Titanic', 'The Godfather', 'Frozen',
    'Guardians of the Galaxy', 'Deadpool', 'The Lion King', 'Forrest Gump',
    'Transformers', 'Avatar', 'Wonder Woman', 'Black Panther',
    'The Shawshank Redemption', 'Finding Nemo', 'Toy Story', 'The Avengers: Endgame'
]


const mapApiMovieToBaseMovie = (movie: Movie): BaseMovies => ({
    id: movie.imdbID || '',
    title: movie.Title,
    image: movie.Poster,
    year: movie.Year,
    type: movie.Type === 'movie' ? 'Movie' : (movie.Type || ''),
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    price: Math.floor(Math.random() * 49) + 19
})

const handleCart = (imdbID: string) => {
    router.push({ name: 'Aluguel', params: { id: imdbID } })
    console.log('Added to cart, imdbID:', imdbID)
}

const fetchMoviesMultipleTitles = async (titles: string[]) => {
    isLoading.value = true
    let allMovies: BaseMovies[] = []
    for (const title of titles) {
        try {
            const movies = await movieStore.fetchMoviesByTitle(title)
            const baseMovies = movies.map(mapApiMovieToBaseMovie).slice(0, 5)
            allMovies = allMovies.concat(baseMovies)
        } catch (error) {
            toast.error(`Error searching movies for "${title}"`)
        }
    }
    rows.value = allMovies
    isLoading.value = false
}

const fetchMovies = async (query: string) => {
    if (!query) {
        rows.value = []
        isLoading.value = false
        return
    }
    isLoading.value = true
    try {
        const movies = await movieStore.fetchMoviesByTitle(query)
        rows.value = movies.map(mapApiMovieToBaseMovie).slice(0, 5)
        if (rows.value.length) {
            toast.success('Movies found!')
        } else {
            toast.error('No movies found for this query.')
        }
    } catch (error) {
        toast.error('Error searching movies.')
        rows.value = []
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    if (!searchValue.value) {
        fetchMoviesMultipleTitles(defaultTitles)
    } else {
        fetchMovies(searchValue.value)
    }
})

watch(searchValue, (newValue) => {
    if (!newValue) {
        fetchMoviesMultipleTitles(defaultTitles)
    } else {
        fetchMovies(newValue)
    }
})

const onSearch = (value: string) => {
    searchValue.value = value
}
</script>

<template>
    <SearchInput @update:search="onSearch" placeholder="Search movies" :type="searchType" />

    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <SkeletonMovieCards v-for="n in 15" :key="n" />
    </div>

    <div v-else class="w-full flex flex-wrap justify-around gap-2 items-start max-w-screen-2xl mb-16">
        <MovieCards v-for="movie in filteredRows" :key="movie.id" :title="movie.title" :image="movie.image"
            :rating="movie.rating" :id="movie.id" :type="movie.type" :year="movie.year" :price="movie.price"
            @add-to-cart="handleCart" />
    </div>
</template>
