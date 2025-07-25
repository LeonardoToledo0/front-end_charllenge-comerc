<script setup lang="ts">
import { markRaw, reactive, ref } from "vue";
import RegistrationsForms from "../../../shared/components/RegistrationsForms.vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { sendingEventUser } from "../services/sendingEventUser";
import type { UserRegister } from "../types/interface.user";



const isLoading = ref(false);
const router = useRouter();
const registrationsForms = markRaw(RegistrationsForms);
const form = reactive<Record<string, any>>({});

const inputs = [
    { id: "name", label: "Nome", type: "text", required: true, placeholder: "ex: Jose" },
    { id: "document", label: "Documento", type: "text", required: true, mask: "###.###.###-##", placeholder: "ex: 000.000.000-00" },
    { id: "password", label: "Senha", type: "password", required: true },
    { id: "passwordConfirmation", label: "Confirmar Senha", type: "password", required: true },

];
const sendRegisterUser = () => {
    isLoading.value = true;
    sendingEventUser({
        props: {
            type: "users",
            inputs,
            isLoading: isLoading.value,
            form,
        },
        emit: (_event: "submit", data: UserRegister) => {
            try {
                const stored = localStorage.getItem("users");
                const users: UserRegister[] = stored ? JSON.parse(stored) : [];
                users.push(data);
                localStorage.setItem("users", JSON.stringify(users));
                toast.success("Usuário cadastrado com sucesso!");
                router.push({ name: "ListaDeUsuarios" });
            } catch (error) {
                toast.error("Erro ao cadastrar usuario.");
                console.error("Erro ao salvar usuario:", error);
            } finally {
                isLoading.value = false;
            }
        },
        formData: form
    });
};
</script>

<template>
    <component :is="registrationsForms" type="users" :inputs="inputs" :isLoading="isLoading" :form="form"
        @submit="sendRegisterUser" />
</template>
