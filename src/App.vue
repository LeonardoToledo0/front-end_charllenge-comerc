<script setup lang="ts">
import { toastContainers } from 'vue3-toastify'
</script>

<template>
    <component :is="toastContainers" />
    <router-view />
</template>
