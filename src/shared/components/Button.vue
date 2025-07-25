<script lang="ts" setup>
import { computed, } from 'vue'
import type { BaseButton } from '../types/button.interface'

const props = defineProps<BaseButton>()
const emit = defineEmits(['click'])

const baseClasses =
    'px-4 py-2 rounded font-semibold text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

const typeClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-800 focus:ring-blue-500 rounded-lg w-full md:max-w-[200px]',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 rounded-lg w-full md:max-w-[200px]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-lg w-full max-w-[200px]',
    movies: 'bg-blue-600 text-white hover:bg-blue-800 focus:ring-blue-500 rounded-lg w-full max-w-[60px] md:max-w-[100px]'
}


const classes = computed(() => {
    return `${baseClasses} ${typeClasses[props.type || 'primary']}`
})

function onClick(event: MouseEvent) {
    if (!props.disabled) {
        emit('click', event)
    } else {
        event.preventDefault()
    }
}
</script>

<template>
    <component :is="asLink ? 'a' : 'button'" :href="asLink && href ? href : undefined" :class="classes"
        :disabled="disabled" @click="onClick">
        {{ label }}
    </component>
</template>
