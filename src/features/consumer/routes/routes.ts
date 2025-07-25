import type { RouteRecordRaw } from "vue-router";
import ConsumerEdit from "../pages/ConsumerEdit.vue";
import ConsumerList from "../pages/ConsumerList.vue";
import ConsumerRegister from "../pages/ConsumerRegister.vue";

export const consumerRoutes: RouteRecordRaw[] = [
    {
        path: "/consumer-list",
        name: "ListaDeClientes",
        component: ConsumerList,
    },
    {
        path: "/consumer-edit/:id",
        name: "EditarCliente",
        component: ConsumerEdit,
    },
    {
        path: "/consumer-register",
        name: "CadastrarCliente",
        component: ConsumerRegister,
    },
]