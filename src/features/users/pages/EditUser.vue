<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, markRaw, reactive } from 'vue'
import type { BaseTable } from '../../../shared/types/tables.interface'
import { useUserStore } from '../store/user.store'
import RegistrationsForms from '../../../shared/components/RegistrationsForms.vue'
import { toast } from 'vue3-toastify'
import bcrypt from 'bcryptjs'

const route = useRoute()
const router = useRouter()
const userId = route.params.id as string
const isLoading = ref(false)
const user = ref<BaseTable | null>(null)
const userStore = useUserStore()

const form = reactive<Record<string, any>>({})

onMounted(() => {
    user.value = userStore.users.find(u => u.id === userId) || null
    if (user.value) {
        form.name = user.value.name
        form.document = user.value.document
        form.password = ''
        form.passwordConfirmation = ''
    }
})

const registrationsForms = markRaw(RegistrationsForms)

const inputs = [
    { id: "name", label: "Nome", type: "text", required: true, placeholder: "ex: Jose" },
    { id: "document", label: "Documento", type: "text", required: true, mask: "###.###.###-##", placeholder: "ex: 000.000.000-00" },
    { id: "password", label: "Senha", type: "password", required: true },
    { id: "passwordConfirmation", label: "Confirmar Senha", type: "password", required: true },
]

const handleEdit = async () => {
    isLoading.value = true

    if (form.password !== form.passwordConfirmation) {
        toast.error("As senhas não coincidem.")
        isLoading.value = false
        return
    }

    const stored = localStorage.getItem("users")
    const users: BaseTable[] = stored ? JSON.parse(stored) : []

    const updatedUsers = await Promise.all(
        users.map(async (u) => {
            if (u.id === userId) {
                const newPassword = form.password
                    ? await bcrypt.hash(form.password, 10)
                    : u.password

                return {
                    ...u,
                    name: form.name,
                    document: form.document,
                    password: newPassword,
                }
            }
            return u
        })
    )

    localStorage.setItem("users", JSON.stringify(updatedUsers))
    toast.success("Usuário atualizado com sucesso!")
    router.push({ name: "ListaDeUsuarios" })
    isLoading.value = false
}
</script>
<template>
    <component :is="registrationsForms" type="users" :inputs="inputs" :isLoading="isLoading" :form="form"
        @submit="handleEdit" />
</template>
