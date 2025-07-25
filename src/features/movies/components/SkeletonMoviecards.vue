<template>
    <div class="w-full max-w-[159px] md:max-w-[230px] rounded-lg mt-10 bg-white shadow-xl animate-pulse">
        <div class="flex items-center justify-center">
            <div class="p-2 rounded-2xl-t h-[240px] w-full bg-gray-200" />
        </div>
        <div class="px-5 mt-2">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div class="flex items-center mt-1 mb-4 space-x-2">
                <div class="flex space-x-1 mt-2">
                    <div class="w-3 h-3 bg-gray-300 rounded-full" v-for="i in 5" :key="i"></div>
                </div>
                <div class="h-3 w-6 bg-gray-300 rounded"></div>
            </div>
            <div class="flex items-center justify-between p-2">
                <div class="h-4 w-10 bg-gray-300 rounded"></div>
                <div class="h-6 w-14 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
</template>
