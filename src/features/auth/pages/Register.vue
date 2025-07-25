<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { toast } from 'vue3-toastify'
import bcrypt from 'bcryptjs';
import { useRouter } from 'vue-router'
import type { UserRegister } from '../../users/types/interface.user'
import AuthForm from '../components/AuthForm.vue'

const isLoading = ref(false)
const router = useRouter()
const authForm = markRaw(AuthForm)


const goToLogin = () => {
    router.push("/login")
}

const sendRegister = async (data: UserRegister & { passwordConfirmation: string }) => {
    console.trace('sendRegister chamado')

    if (isLoading.value) {
        console.warn('Tentativa de envio duplicado bloqueada')
        return
    }

    isLoading.value = true

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser: UserRegister = {
        id: crypto.randomUUID(),
        name: data.name,
        document: data.document.replace(/\D/g, ''),
        password: hashedPassword,
        status: 'active',
    }

    const usersStorage = localStorage.getItem('users')
    const registeredUsers: UserRegister[] = usersStorage ? JSON.parse(usersStorage) : []

    registeredUsers.push(newUser)

    localStorage.setItem('users', JSON.stringify(registeredUsers))
    setTimeout(() => {
        isLoading.value = false
        toast.success('Usuário registrado com sucesso!')
        console.log('Usuário criado:', newUser)
        router.push({ name: 'login' })
    }, 1000)
}


</script>

<template>
    <component :is="authForm" type="register" :inputs="[
        { id: 'name', label: 'Nome', type: 'text', required: true, placeholder: 'Jose da Silva' },
        { id: 'document', label: 'Documento', type: 'text', required: true, mask: '###.###.###-##', placeholder: '000.000.000-00' },
        { id: 'password', label: 'Senha', type: 'password', required: true },
        { id: 'passwordConfirmation', label: 'Confirmar Senha', type: 'password', required: true }
    ]" :isLoading="isLoading" @submit="sendRegister" @login="goToLogin" />
</template>
