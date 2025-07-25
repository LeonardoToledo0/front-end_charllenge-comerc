<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import bgImage from '../../assets/bg.jpg'

const router = useRouter()

onMounted(async () => {
    await router.isReady()
    setTimeout(() => {
        router.push({ name: 'login' })
    }, 2000)
})
</script>

<template>
    <section class="w-full h-screen flex justify-center items-center" :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }">
        <div class="bg-white px-20 py-40 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:space-x-2">
            <h1 class="text-6xl font-bold bg-gradient-text ">
                Stream

            </h1>
            <h2 class="text-6xl text-center font-bold text-white bg-blue-600 p-4 rounded-2xl">Play</h2>
        </div>
    </section>
</template>
