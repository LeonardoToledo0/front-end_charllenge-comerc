<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'
import type { UserLogin } from '../../users/types/interface.user'
import AuthForm from '../components/AuthForm.vue'
import bcrypt from 'bcryptjs'

const isLoading = ref(false)
const router = useRouter()
const authForm = markRaw(AuthForm)

const goToRegister = () => {
    router.push({ name: 'register' })
}

const sendLogin = async (data: UserLogin) => {
    isLoading.value = true
    const { document, password } = data

    if (!document || !password) {
        toast.error('Preencha todos os campos')
        isLoading.value = false
        return
    }

    setTimeout(async () => {
        const stored = localStorage.getItem('users')
        const registeredUsers: UserLogin[] = stored ? JSON.parse(stored) : []

        const user = registeredUsers.find((u) => u.document === document)

        if (user && await bcrypt.compare(password, user.password)) {
            localStorage.setItem('loggedUser', JSON.stringify(user))
            toast.success('Login realizado com sucesso!')
            router.push({ name: 'Filmes' })
        } else {
            toast.error('Documento ou senha inválidos')
        }

        isLoading.value = false
    }, 1000)

}
</script>

<template>
    <component :is="authForm" type="login" :inputs="[
        { id: 'document', label: 'Documento', type: 'text', required: true, mask: '###.###.###-##', placeholder: '000.000.000-00' },
        { id: 'password', label: 'Senha', type: 'password', required: true },
    ]" :isLoading="isLoading" @submit="sendLogin" @register="goToRegister" />
</template>
