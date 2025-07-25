<script setup lang="ts">
import { markRaw, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchMovieById } from '../services/searchMovies'
import SkeletonMovie from '../components/SkeletonMovie.vue'
import Button from '../../../shared/components/Button.vue'
import DetaisRental from '../components/DetaisRental.vue'
import RentalModal from '../../rentals/components/RentalModal.vue'
import type { Rental } from '../../rentals'
import { useConsumerStore } from '../../consumer'
import { useRentalStore } from '../../rentals/store/useRentalStore'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string
const response = ref<any | null>(null)
const skeleton = markRaw(SkeletonMovie)
const isModalOpen = ref(false)

const rentalStore = useRentalStore()
const consumerStore = useConsumerStore()

rentalStore.loadRentals()

const consumers = computed(() =>
  consumerStore.allConsumers.map(c => ({
    id: c.id,
    name: `${c.firstName} ${c.lastName}`
  }))
)

onMounted(() => {
  consumerStore.loadConsumers()
})


const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}')
const currentUserId = loggedUser.id || ''
const currentConsumerId = localStorage.getItem('consumerId') || ''

const rentalData = ref<Rental>({
  consumerId: currentConsumerId,
  movieId: id,
  userId: currentUserId,
  movieTitle: '',
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  status: 'rented',
})

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const confirmRental = (updatedRental: Rental) => {
  try {
    const success = rentalStore.addRental(updatedRental)
    if (success) {
      closeModal()
    }
  } catch (error) {
    console.error('Erro ao alugar filme:', error)
  }
}


onMounted(async () => {
  try {
    const res = await searchMovieById(id)
    response.value = res
    rentalData.value.movieTitle = res.Title
  } catch (error) {
    console.error('Erro ao buscar filme:', error)
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <DetaisRental v-if="response" :response="response" />
    <component :is="skeleton" v-else />

    <div class="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 justify-end items-center md:space-x-2">
      <Button label="Alugar" type="primary" @click="openModal" />
      <Button label="Voltar" type="secondary" @click="router.back()" />
    </div>

    <RentalModal :visible="isModalOpen" :rentalData="rentalData" :consumers="consumers" @close="closeModal"
      @confirm="confirmRental" />
  </div>
</template>
