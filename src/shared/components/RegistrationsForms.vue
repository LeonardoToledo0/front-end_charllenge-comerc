<script setup lang="ts">
import type { BaseRegistration } from '../types/registrations.interface';

import Button from './Button.vue';
import { sendingEventUser } from '../../features/users/services/sendingEventUser';
import { sendingEventRegistrations } from '../../features/consumer/services/sendingEventRegistrations';

const props = defineProps<BaseRegistration & { type: 'users' | 'consumer'; form: Record<string, any> }>();

const emit = defineEmits<{
    (e: 'submit', data: any): void
}>();

const onSubmit = (e: Event) => {
    e.preventDefault();

    if (props.type === 'users') {
        sendingEventUser({
            props: props as BaseRegistration & { type: 'users'; form: Record<string, any> },
            emit,
            formData: props.form,
        });
    } else if (props.type === 'consumer') {
        sendingEventRegistrations({
            props: props as BaseRegistration & { type: 'consumer'; form: Record<string, any> },
            emit,
            formData: props.form,
        });
    }
};
</script>

<template>
    <section class="h-full flex w-full justify-center items-center px-6 md:mt-20">
        <form @submit="onSubmit" class="max-w-2xl w-full space-y-6">
            <div class="flex flex-wrap -mx-2">
                <div v-for="input in props.inputs" :key="input.id" class="w-full md:w-1/2 px-2 mb-6">
                    <label :for="input.id" class="block mb-2 text-sm font-medium text-gray-900">
                        {{ input.label }}
                    </label>

                    <input v-if="input.mask" v-mask="input.mask" v-model="props.form[input.id]" :type="input.type"
                        :id="input.id" :placeholder="input.placeholder || ''" :required="input.required || false"
                        autocomplete="off"
                        class="bg-transparent border-b border-gray-300 w-full p-2  text-gray-900 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500" />

                    <input v-else v-model="props.form[input.id]" :type="input.type" :id="input.id"
                        :placeholder="input.placeholder || ''" :required="input.required || false" autocomplete="off"
                        class="bg-transparent border-b border-gray-300 w-full p-2 text-gray-900 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500" />
                </div>
            </div>

            <div class="flex flex-row w-full justify-end items-center">
                <Button
                    :label="props.isLoading ? 'Carregando...' : (props.type === 'consumer' ? 'Cadastrar' : 'Atualizar')"
                    type="primary" :disabled="props.isLoading" />
            </div>
        </form>
    </section>
</template>
