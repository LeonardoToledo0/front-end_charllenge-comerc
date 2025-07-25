<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue'
import type { PlaceholderSearch } from '../types/serach.interface';

const props = defineProps<PlaceholderSearch>()
const emit = defineEmits<{
    (e: 'update:search', value: string): void
}>()

const search = ref('')

const onInput = () => {
    emit('update:search', search.value)
}
</script>

<template>
    <div class="w-full h-auto flex items-center justify-end mb-6">
        <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 cursor-pointer">
                <MagnifyingGlassIcon class="w-5 h-5 text-blue-600 " @click="onInput" />
            </div>
            <input type="text" id="table-search" v-model="search" class=" block px-4 py-2 pl-10 w-full text-sm text-gray-700 bg-[#F8F9FA] rounded-lg border
                border-gray-300 focus:ring-gray-500 focus:border-gray-500" :placeholder="props.placeholder" />
        </div>
    </div>
</template>
