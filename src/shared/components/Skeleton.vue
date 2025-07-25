<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TableSkeleton'
})

</script>
<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-[#F8F9FA]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                    <th class="px-6 py-3">Id</th>
                    <th class="px-6 py-3">Nome</th>
                    <th class="px-6 py-3">Email</th>
                    <th class="px-6 py-3">Status</th>
                    <th class="px-6 py-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in 5" :key="n" class="animate-pulse text-xs text-gray-700 uppercase">
                    <td class="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                        <div class="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-200  rounded w-16"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-200  rounded w-12"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
