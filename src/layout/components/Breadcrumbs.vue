<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<template>
    <div class="w-full text-sm text-gray-500 mt-22 px-6">
        <h1 class="w-full text-lg font-semibold text-gray-700 ml-1 capitalize ">
            {{ route.name || 'Página' }}
        </h1>
    </div>
</template>
