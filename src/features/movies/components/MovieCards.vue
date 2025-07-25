<script setup lang="ts">
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import { StarIcon as StarOutline } from '@heroicons/vue/24/outline'
import type { BaseMovies } from '../types/movie.interface'
import Button from '../../../shared/components/Button.vue';

const props = defineProps<BaseMovies>()
const emit = defineEmits(['add-to-cart'])

const addToCart = () => {
    emit('add-to-cart', props.id)
}
</script>

<template>
    <div class="w-full  max-w-[159px] md:max-w-[230px] rounded-lg mt-10 bg-white shadow-xl">
        <div class="flex  items-center justify-center ">
            <img class="p-2 rounded-2xl h-[240px] object-cover " :src="props.image" :alt="props.title" loading="lazy"
                :year="props.year" />

        </div>

        <div class="px-5 pb-5">
            <h5 class="text-sm font-semibold text-gray-700 truncate">
                {{ props.title }}
            </h5>
            <p class="ext-gray-600 text-xs mb-1">
                Ano: {{ props.year }} | Tipo: {{ props.type }}
            </p>
            <div class="flex items-center mt-1 mb-2">
                <div class="flex items-center space-x-1">
                    <template v-for="n in 5" :key="n">
                        <component :is="n <= Math.floor(props.rating) ? StarSolid : StarOutline" class="w-3 h-3"
                            :class="n <= Math.floor(props.rating) ? 'text-yellow-300' : 'text-gray-500'" />
                    </template>
                </div>
                <span class="text-[10px] bg-blue-500 ml-2 font-medium px-1  rounded text-white">
                    {{ props.rating.toFixed(1) }}
                </span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-base font-bold text-gray-700">
                    ${{ props.price }}
                </span>
                <Button label="Ver" type="movies" @click="addToCart" class="text-xs px-2 py-1" />
            </div>
        </div>
    </div>
</template>
