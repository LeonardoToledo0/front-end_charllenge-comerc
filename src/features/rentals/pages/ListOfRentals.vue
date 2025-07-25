<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { BaseTable } from '../../../shared/types/tables.interface';
import { searchValue, searchType, rows, filteredRows } from '../../../shared/utils/serchFilters';
import SearchInput from '../../../shared/components/SearchInput.vue';
import Skeleton from '../../../shared/components/Skeleton.vue';
import Table from '../../../shared/components/Table.vue';
import { toast } from 'vue3-toastify';
import { useRentalStore } from '../store/useRentalStore';
import { useConsumerStore } from '../../consumer';

const loading = ref(true)
rows.value = [] as BaseTable[]
searchType.value = 'rentals'

const rentalStore = useRentalStore()
const consumerStore = useConsumerStore()

const handleSearch = (value: string) => {
    searchValue.value = value.trim();

    if (!value) {
        toast.info('Digite algo para buscar as locações');
        rows.value = [];
        return;
    }
    if (filteredRows.value.length === 0) {
        toast.error('Ops! Não encontramos nenhuma locação.');
    } else {
        toast.success('Locação(s) encontrado(s) com sucesso!');
    }
};

onMounted(() => {
    setTimeout(() => {
        rentalStore.loadRentals()
        consumerStore.loadConsumers()

        rows.value = rentalStore.rentals.map((r, index) => {
            const consumer = consumerStore.consumers.find(c => c.id === r.consumerId)

            return {
                id: index + 1,
                name: consumer ? `${consumer.firstName} ${consumer.lastName}` : 'Desconhecido',
                movieTitle: r.movieTitle,
                status: r.status,
                startDate: r.startDate,
                endDate: r.endDate,
            }
        })

        loading.value = false
    }, 500)
})

const handleRemove = (item: BaseTable) => {
    try {
        rentalStore.rentals = rentalStore.rentals.filter(
            r => r.movieTitle !== item.movieTitle || r.consumerId !== item.name
        )
        rentalStore.saveRentals()

        rows.value = rows.value.filter(r => r.id !== item.id)
        localStorage.setItem('listRentals', JSON.stringify(rentalStore.rentals))

        toast.success('Locação devolvida com sucesso!')
    } catch (error) {
        console.error('Erro ao remover locação:', error)
        toast.error('Erro ao remover locação. Tente novamente.')
    }
}

</script>

<template>
    <SearchInput @update:search="handleSearch" placeholder="Buscar usuarios" :type="searchType" />
    <Skeleton v-if="loading" />
    <Table v-else :rows="filteredRows" @remove="handleRemove" type="rentals" />
</template>
