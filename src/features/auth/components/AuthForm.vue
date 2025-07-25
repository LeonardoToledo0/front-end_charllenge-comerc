<script setup lang="ts">
import Button from '../../../shared/components/Button.vue';
import { sendingEvent } from '../services/sendingEvent';
import type { BaseAuth } from '../types/auth.interface';
import bgImage from '../../../assets/bg.jpg'

const props = defineProps<BaseAuth>();

const emit = defineEmits<{
    (e: 'submit', data: any): void
    (e: 'register'): void
    (e: 'login'): void
}>();

const onSubmit = (e: Event) => {
    e.preventDefault();
    sendingEvent({ e, props, emit });
}
</script>

<template>
    <section class="min-h-screen flex w-full justify-center items-center px-6" :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }">
        <form @submit="onSubmit" class="max-w-lg w-full space-y-6 bg-white shadow-2xl rounded-2xl p-10">
            <div v-for="input in inputs" :key="input.id" class="mb-5">
                <label :for="input.id" class="block mb-2 text-sm font-medium text-gray-900">
                    {{ input.label }}
                </label>

                <input v-if="input.mask" v-mask="input.mask" :type="input.type" :id="input.id"
                    :placeholder="input.placeholder || ''" :required="input.required || false" autocomplete="off"
                    class="bg-transparent border-b border-gray-300 w-full p-2 text-gray-900 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500" />
                <input v-else :type="input.type" :id="input.id" :placeholder="input.placeholder || ''"
                    :required="input.required || false" autocomplete="off"
                    class="bg-transparent border-b border-gray-300 w-full p-2 text-gray-900 text-sm focus:outline-none focus:border-b-2 focus:border-blue-500" />
            </div>

            <div class="flex flex-col md:flex-row w-full justify-center items-center md:space-x-2 gap-4 md:gap-0 ">
                <Button :label="isLoading ? 'Carregando...' : (type === 'login' ? 'Entrar' : 'Cadastrar')"
                    type="primary" :disabled="isLoading" />
                <Button v-if="type === 'login'" label="Registrar" type="secondary" @click="$emit('register')" />
                <Button v-if="type === 'register'" label="Voltar" type="secondary" @click="$emit('login')" />
            </div>
        </form>
    </section>
</template>
