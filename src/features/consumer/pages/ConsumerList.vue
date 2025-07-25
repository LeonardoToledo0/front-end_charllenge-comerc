<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { BaseTable } from '../../../shared/types/tables.interface';
import Skeleton from '../../../shared/components/Skeleton.vue';
import Table from '../../../shared/components/Table.vue';
import SearchInput from '../../../shared/components/SearchInput.vue';
import { searchValue, searchType } from '../../../shared/utils/serchFilters';
import { useConsumerStore } from '../stores/consumer.store';
import { useRouter } from 'vue-router';

const loading = ref(true);
const consumerStore = useConsumerStore();
const rows = ref<BaseTable[]>([]);
searchType.value = 'consumer';

const router = useRouter();

onMounted(async () => {
    await consumerStore.loadConsumers();

    rows.value = consumerStore.consumers.map(consumer => ({
        id: consumer.id,
        name: `${consumer.firstName} ${consumer.lastName}`,
        phone: consumer.phone,
        document: consumer.document,
        email: consumer.email,
        status: 'ativo',
    }));

    loading.value = false;
});

watch(
    () => consumerStore.consumers,
    (newConsumers) => {
        rows.value = newConsumers.map(consumer => ({
            id: consumer.id,
            name: `${consumer.firstName} ${consumer.lastName}`,
            email: consumer.email,
            phone: consumer.phone,
            document: consumer.document,
            status: 'ativo',
        }));
    },
    { deep: true }
);

const filteredRows = computed(() => {
    return rows.value.filter(row =>
        row.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
});

const handleSearch = (value: string) => {
    searchValue.value = value;
    console.log('Valor buscado:', value);
};

const handleEdit = (item: BaseTable) => {
    router.push({ name: 'EditarCliente', params: { id: item.id } });
};
</script>


<template>
    <SearchInput @update:search="handleSearch" placeholder="Buscar clientes" :type="searchType" />
    <Skeleton v-if="loading" />
    <Table v-else :rows="filteredRows" @edit="handleEdit" type="consumer" />
</template>
