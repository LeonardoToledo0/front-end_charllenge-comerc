<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import type { Rental } from '../types/interface.rentals'

interface Consumer {
    id: string
    name: string
}

const props = defineProps<{
    visible: boolean
    rentalData: Rental
    consumers: Consumer[]
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'confirm', rental: Rental): void
}>()

const startDate = ref(props.rentalData.startDate)
const endDate = ref(props.rentalData.endDate)
const selectedConsumerId = ref(props.rentalData.consumerId || '')

watch(() => props.rentalData.startDate, (val) => startDate.value = val)
watch(() => props.rentalData.endDate, (val) => endDate.value = val)
watch(() => props.rentalData.consumerId, (val) => selectedConsumerId.value = val)

const confirmRental = () => {
    if (!selectedConsumerId.value) {
        alert('Please select a consumer')
        return
    }
    emit('confirm', {
        ...props.rentalData,
        consumerId: selectedConsumerId.value,
        startDate: startDate.value,
        endDate: endDate.value,
        status: 'rented',
    })
}

const closeModal = () => {
    emit('close')
}
</script>

<template>
    <div v-if="visible" class="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <h2 class="text-xl font-bold mb-4">Confirmar Aluguel</h2>

            <p class="mb-4">Alugar filme: <strong>{{ rentalData.movieTitle }}</strong></p>
            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="consumer">Consumidor:</label>
                <select id="consumer" v-model="selectedConsumerId" class="border rounded px-3 py-2 w-full">
                    <option disabled value="">Selecione um cliente</option>
                    <option v-for="consumer in props.consumers" :key="consumer.id" :value="consumer.id">
                        {{ consumer.name }}
                    </option>
                </select>
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="start-date">Retirada:</label>
                <input type="date" id="start-date" v-model="startDate" class="border rounded px-3 py-2 w-full" />
            </div>

            <div class="mb-4">
                <label class="block mb-1 font-semibold" for="end-date">Entrega:</label>
                <input type="date" id="end-date" v-model="endDate" class="border rounded px-3 py-2 w-full" />
            </div>

            <div class="flex justify-end space-x-3">
                <button @click="closeModal" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button @click="confirmRental"
                    class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Confirm</button>
            </div>

            <button @click="closeModal"
                class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold">&times;</button>
        </div>
    </div>
</template>
