<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline';

import { onMounted } from 'vue'
import { useAuthStore } from '../../features/auth';

const emit = defineEmits(['toggle-sidebar'])
const auth = useAuthStore()
onMounted(() => {
    auth.loadUser()
})
</script>
<template>
    <div class="fixed z-30 w-full h-16 px-6 bg-[#F8F9FA] flex items-center justify-between shadow-2xl">
        <button @click="emit('toggle-sidebar')" class="lg:hidden p-2 rounded hover:bg-gray-200">
            <Bars3Icon class="w-6 h-6 text-gray-600" />
        </button>

        <h1 class="text-lg font-semibold text-gray-700">
            Bem-vindo
            <span class="ml-2 bg-gradient-text  text-xl font-bold ">
                {{ auth.user?.name }}
            </span>
        </h1>
    </div>
</template>
