<script setup lang="ts">
import type { BaseTable } from '../types/tables.interface'

defineProps<{
    rows: BaseTable[],
    loading?: boolean,
    type?: string
}>()

const emit = defineEmits<{
    (e: 'edit', item: BaseTable): void
    (e: 'remove', item: BaseTable): void
    (e: 'deactivate', item: BaseTable): void
    (e: 'activate', item: BaseTable): void
}>()

const formatDate = (date?: string) => {
    if (!date) return '-'
    const d = new Date(date)
    return isNaN(d.getTime()) ? 'Data inválida' : d.toLocaleDateString('pt-BR')
}

const onEdit = (item: BaseTable) => {
    emit('edit', item)
    emit('remove', item)
    emit('deactivate', item)
    emit('activate', item)

}
</script>



<template>
    <div class="relative overflow-x-auto shadow-xl rounded-lg bg-[#F8F9FA]">
        <template v-if="type === 'users'">
            <table id="users" class="w-full text-sm text-left text-gray-700">
                <thead class="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th class="px-6 py-3">Nome</th>
                        <th class="px-6 py-3">Cpf</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Ações</th>
                        <th class="px-6 py-3">Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rows" :key="item.id"
                        class="bg-[#F8F9FA] border-b border-gray-200 hover:bg-gray-200 transition ease-in-out duration-300 truncate">
                        <td class="px-6 py-4">{{ item.name }}</td>
                        <td class="px-6 py-4">{{ item.document }}</td>
                        <td class="px-6 py-4">{{ item.status === 'inactive' ? 'Inativo' : item.status === 'active' ?
                            'Ativo' : item.status }}</td>
                        <td class="px-6 py-4">
                            <a @click="$emit('edit', item)"
                                class="font-medium bg-gradient-text cursor-pointer uppercase mr-2">
                                Editar
                            </a>
                        </td>
                        <td class="px-6 py-4">
                            <a v-if="item.status === 'active'" @click="$emit('deactivate', item)"
                                class="font-medium text-red-600 cursor-pointer uppercase">
                                Desativar
                            </a>
                            <a v-else @click="$emit('activate', item)"
                                class="font-medium text-green-600 cursor-pointer uppercase">
                                Ativar
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>


        <template v-else-if="type === 'rentals'">
            <table id="rentals" class="w-full text-sm text-left text-gray-700">
                <thead class="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th class="px-6 py-3">Filme</th>
                        <th class="px-6 py-3">Cliente</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Data de Aluguel</th>
                        <th class="px-6 py-3">Data de Devolução</th>
                        <th class="px-6 py-3">Ações</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rows" :key="item.id"
                        class="bg-[#F8F9FA] border-b border-gray-200 hover:bg-gray-200 transition ease-in-out duration-300 truncate">
                        <td class="px-6 py-4">{{ item.movieTitle }}</td>
                        <td class="px-6 py-4">{{ item.name }}</td>
                        <td class="px-6 py-4">{{ item.status === 'rented' ? 'Alugado' : item.status }}</td>
                        <td class="px-6 py-4">{{ formatDate(item.startDate) }}</td>
                        <td class="px-6 py-4">{{ formatDate(item.endDate) }}</td>
                        <td class="px-6 py-4">
                            <a @click="onEdit(item)" class="font-medium bg-gradient-text cursor-pointer uppercase">
                                Devolução
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>

        <template v-else>

            <table class="w-full text-sm text-left text-gray-700">
                <thead class="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th class="px-6 py-3">Nome</th>
                        <th class="px-6 py-3">Email</th>
                        <th class="px-6 py-3">Telefone</th>
                        <th class="px-6 py-3">Cpf</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in rows" :key="item.id"
                        class="bg-[#F8F9FA] border-b border-gray-200 hover:bg-gray-200 transition ease-in-out duration-300 truncate">
                        <td class="px-6 py-4">{{ item.name }}</td>
                        <td class="px-6 py-4">{{ item.email }}</td>
                        <td class="px-6 py-4">{{ item.phone }}</td>
                        <td class="px-6 py-4">{{ item.document }}</td>
                        <td class="px-6 py-4">{{ item.status }}</td>
                        <td class="px-6 py-4">
                            <a @click="$emit('edit', item)"
                                class="font-medium bg-gradient-text cursor-pointer uppercase mr-2">
                                Editar
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </div>
</template>
