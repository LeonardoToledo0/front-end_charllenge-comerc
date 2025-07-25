<script setup lang="ts">
import Breadcrumbs from './components/Breadcrumbs.vue'
import TopBar from './components/TopBar.vue'
import { markRaw, ref } from 'vue'
import Sidebar from './components/Sidebar.vue'



const topBar = markRaw(TopBar)
const breadcrumbs = markRaw(Breadcrumbs)
const sidebar = markRaw(Sidebar)
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}


</script>

<template>
  <div class="flex h-screen w-full">

    <component :is="sidebar" :isOpen="sidebarOpen" @close-sidebar="closeSidebar" />
    <main class="flex-1 flex flex-col min-h-screen bg-[#F8F9FA] overflow-y-auto">
      <component :is="topBar" @toggle-sidebar="toggleSidebar" />
      <component :is="breadcrumbs" />
      <div class="p-6">
        <router-view />
      </div>
    </main>
  </div>
</template>
