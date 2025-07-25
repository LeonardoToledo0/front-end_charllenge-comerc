<script setup lang="ts">
import { markRaw, reactive, ref, watch } from "vue";
import RegistrationsForms from "../../../shared/components/RegistrationsForms.vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import type { ConsumerRegister } from "../types/interface.consumer";
import { sendingEventRegistrations } from "../services/sendingEventRegistrations";
import { searchZipCode } from "../services/searchZipCode";

const isLoading = ref(false);
const router = useRouter();
const registrationsForms = markRaw(RegistrationsForms);
const form = reactive<Record<string, any>>({});

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
];

watch(() => form.zipCode, async (newCep) => {
    if (!newCep) return;
    const sanitizedCep = newCep.replace(/\D/g, "");
    if (sanitizedCep.length === 8) {
        try {
            const data = await searchZipCode(sanitizedCep);
            form.street = data.logradouro || "";
            form.neighborhood = data.bairro || "";
            form.city = data.localidade || "";
            form.state = data.uf || "";
            form.country = "Brasil";
        } catch (err) {
            toast.error("Erro ao buscar endereço pelo CEP");
        }
    }
});

const sendRegisterConsumer = () => {
    isLoading.value = true;

    sendingEventRegistrations({
        props: {
            type: "consumer",
            inputs,
            isLoading: isLoading.value,
            form,
        },
        emit: (_event: "submit", data: ConsumerRegister) => {
            try {
                const stored = localStorage.getItem("consumers");
                const consumers: ConsumerRegister[] = stored ? JSON.parse(stored) : [];
                consumers.push(data);
                localStorage.setItem("consumers", JSON.stringify(consumers));
                toast.success("Cliente cadastrado com sucesso!");
                router.push({ name: "ListaDeClientes" });
            } catch (error) {
                toast.error("Erro ao cadastrar cliente.");
                console.error("Erro ao salvar cliente:", error);
            } finally {
                isLoading.value = false;
            }
        },
        formData: form
    });
};

</script>

<template>
    <component :is="registrationsForms" type="consumer" :inputs="inputs" :isLoading="isLoading" :form="form"
        @submit="sendRegisterConsumer" />
</template>
