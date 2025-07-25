<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, markRaw, reactive, watch } from 'vue'
import type { ConsumerRegister } from '../types/interface.consumer'
import RegistrationsForms from '../../../shared/components/RegistrationsForms.vue'
import { toast } from 'vue3-toastify'

import { useConsumerStore } from '../stores/consumer.store'
import { searchZipCode } from '../services/searchZipCode'

const route = useRoute()
const router = useRouter()
const userId = route.params.id as string
const isLoading = ref(false)
const consumer = ref<ConsumerRegister | null>(null)
const userStore = useConsumerStore()

const form = reactive<Record<string, any>>({})

onMounted(() => {
    const found = userStore.consumers.find(u => u.id === userId) || null
    consumer.value = found

    if (consumer.value) {
        form.firstName = consumer.value.firstName
        form.lastName = consumer.value.lastName
        form.document = consumer.value.document
        form.email = consumer.value.email
        form.phone = consumer.value.phone
        const address = consumer.value.address?.[0] || {}
        form.zipCode = address.zipCode || ''
        form.street = address.street || ''
        form.number = address.number || ''
        form.neighborhood = address.neighborhood || ''
        form.city = address.city || ''
        form.state = address.state || ''
        form.country = address.country || ''
        form.password = ''
        form.passwordConfirmation = ''
    }
})

const registrationsForms = markRaw(RegistrationsForms)

const inputs = [
    { id: "firstName", label: "Nome", type: "text", required: true, placeholder: "ex: Jose" },
    { id: "lastName", label: "Sobrenome", type: "text", required: true, placeholder: "ex: da Silva" },
    { id: "document", label: "Documento", type: "text", required: true, mask: "###.###.###-##", placeholder: "ex: 000.000.000-00" },
    { id: "email", label: "Email", type: "email", required: true, placeholder: "ex: josedasilva@email.com" },
    { id: "phone", label: "Telefone", type: "text", required: true, mask: "(##) #####-####", placeholder: "ex: (00)00000-0000" },
    { id: "zipCode", label: "CEP", type: "text", required: true, mask: "#####-###", placeholder: "ex: 00000-000" },
    { id: "street", label: "Rua", type: "text", required: true, placeholder: "ex: Rua da Silva" },
    { id: "number", label: "Número", type: "text", required: true, mask: "#####", placeholder: "ex: 0143" },
    { id: "neighborhood", label: "Bairro", type: "text", required: true, placeholder: "ex: Vila Maria" },
    { id: "city", label: "Cidade", type: "text", required: true, placeholder: "ex: Sao Paulo" },
    { id: "state", label: "Estado", type: "text", required: true, placeholder: "ex: SP" },
    { id: "country", label: "País", type: "text", required: true, placeholder: "ex: Brasil" },
]

watch(() => form.zipCode, async (newCep) => {
    if (!newCep) return
    const sanitizedCep = newCep.replace(/\D/g, "")
    if (sanitizedCep.length === 8) {
        try {
            const data = await searchZipCode(sanitizedCep)
            form.street = data.logradouro || ""
            form.neighborhood = data.bairro || ""
            form.city = data.localidade || ""
            form.state = data.uf || ""
            form.country = "Brasil"
        } catch (err) {
            toast.error("Erro ao buscar endereço pelo CEP")
        }
    }
})

const handleEdit = async () => {
    isLoading.value = true

    if (form.password !== form.passwordConfirmation) {
        toast.error("As senhas não coincidem.")
        isLoading.value = false
        return
    }



    const updatedConsumer: ConsumerRegister = {
        ...consumer.value!,
        firstName: form.firstName,
        lastName: form.lastName,
        document: form.document,
        email: form.email,
        phone: form.phone,
        address: [{
            street: form.street,
            number: form.number,
            neighborhood: form.neighborhood,
            city: form.city,
            state: form.state,
            country: form.country,
            zipCode: form.zipCode,
        }],
    }

    await userStore.updateConsumer(updatedConsumer)

    toast.success("Cliente atualizado com sucesso!")
    router.push({ name: "ListaDeClientes" })
    isLoading.value = false
}

</script>

<template>
    <component :is="registrationsForms" type="users" :inputs="inputs" :isLoading="isLoading" :form="form"
        @submit="handleEdit" />
</template>
