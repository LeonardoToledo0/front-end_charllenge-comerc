<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { MenuGroup } from '../constants/SidebarMenu'

const { isOpen } = defineProps<{ isOpen: boolean }>()


const emit = defineEmits(['close-sidebar'])

const route = useRoute()
const router = useRouter()

const goTo = (path: string) => {
    router.push({ path })
    localStorage.removeItem('loggedUser')
    emit('close-sidebar')
}
</script>

<template>
    <aside :class="[
        'fixed top-0 left-0 z-50 h-screen w-[250px] px-4 py-8 border-r border-gray-200 shadow-md bg-[#F8F9FA] transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:block'
    ]">
        <div class="flex items-center justify-center mb-6">
            <h2 class="text-lg font-bold bg-gradient-text">
                Stream <span class="text-white bg-blue-600 px-2 py-1 rounded-md">Play</span>
            </h2>
        </div>
        <ul>
            <li v-for="item in MenuGroup" :key="item.title" :class="[
                'flex cursor-pointer p-2 mb-2 rounded hover:bg-gray-200',
                route.path === item.path ? 'bg-gray-200 font-bold' : ''
            ]" @click="goTo(item.path)">
                <div class="flex items-center space-x-2">
                    <div class="flex justify-center items-center w-8 h-8 rounded-lg shadow-md">
                        <component :is="item.icon" class="w-5 h-5 text-blue-600" />
                    </div>
                    <span class="bg-gradient-text font-semibold">{{ item.title }}</span>
                </div>
            </li>
        </ul>
    </aside>
</template>
