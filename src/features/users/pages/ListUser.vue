<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { BaseTable } from '../../../shared/types/tables.interface';
import { searchValue, searchType } from '../../../shared/utils/serchFilters';
import SearchInput from '../../../shared/components/SearchInput.vue';
import Skeleton from '../../../shared/components/Skeleton.vue';
import Table from '../../../shared/components/Table.vue';
import { useUserStore } from '../store/user.store';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter();
const loading = ref(true);
const rows = ref<BaseTable[]>([]);
const userStore = useUserStore();

onMounted(async () => {
    await userStore.loadUsers();
    rows.value = userStore.users.map(user => ({
        id: user.id,
        name: user.name,
        document: user.document,
        status: user.status
    }));
    loading.value = false;
});

watch(() => userStore.users, (newUsers) => {
    rows.value = newUsers.map(user => ({
        id: user.id,
        name: user.name,
        document: user.document,
        status: user.status
    }));
}, { deep: true });

const filteredRows = computed(() => {
    return rows.value.filter(row => row.name.toLowerCase().includes(searchValue.value.toLowerCase()));
});

const handleSearch = (value: string) => {
    searchValue.value = value;
    console.log('Valor buscado:', value);
};

const handleEdit = (item: BaseTable) => {
    router.push({ name: 'EditarUsuario', params: { id: item.id } });
};

const handleDeactivate = (item: BaseTable) => {
    const userIndex = userStore.users.findIndex(u => u.id === item.id);
    if (userIndex !== -1) {
        userStore.users[userIndex].status = 'inactive';
        userStore.saveUsers();
        toast.success(`Usuário ${item.name} desativado com sucesso.`);
    }

    const rowIndex = rows.value.findIndex(r => r.id === item.id);
    if (rowIndex !== -1) {
        rows.value[rowIndex].status = 'inactive';
    }
};

const handleActivate = (item: BaseTable) => {
    const userIndex = userStore.users.findIndex(u => u.id === item.id);
    if (userIndex !== -1) {
        userStore.users[userIndex].status = 'active';
        userStore.saveUsers();
        toast.success(`Usuário ${item.name} ativado com sucesso.`);
    }

    const rowIndex = rows.value.findIndex(r => r.id === item.id);
    if (rowIndex !== -1) {
        rows.value[rowIndex].status = 'active';
    }
};;

</script>

<template>
    <SearchInput @update:search="handleSearch" placeholder="Buscar usuarios" :type="searchType" />
    <Skeleton v-if="loading" />
    <Table v-else :rows="filteredRows" @edit="handleEdit" @deactivate="handleDeactivate" @activate="handleActivate"
        type="users" />
</template>
