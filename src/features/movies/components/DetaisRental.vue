<script setup lang="ts">
import type { Movie } from '../types/movie.interface';
defineProps<{
    response: Movie
}>()
</script>

<template>
    <div class="w-full mx-auto">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">🎬 Detalhes do Aluguel</h1>

        <div class="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <img :src="response.Poster" alt="Poster do filme" class="w-full md:w-1/3 object-cover" />

            <div class="p-6 flex-1">
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">{{ response.Title }}</h2>
                <p class="text-sm text-gray-500 mb-4 italic">
                    ID: {{ response.id || response.imdbID }}
                </p>

                <ul class="space-y-2 text-gray-700">
                    <li><strong>Ano:</strong> {{ response.Year }}</li>
                    <li><strong>Gênero:</strong> {{ response.Genre }}</li>
                    <li><strong>Diretor:</strong> {{ response.Director }}</li>
                    <li><strong>Elenco:</strong> {{ response.Actors }}</li>
                    <li>
                        <strong>Descrição:</strong>
                        <span class="block mt-1 text-justify">{{ response.Plot }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
