import type { RouteRecordRaw } from "vue-router";
import EditUser from "../pages/EditUser.vue";
import ListUser from "../pages/ListUser.vue";
import RegiterUser from "../pages/RegiterUser.vue";


export const usersRoutes: RouteRecordRaw[] = [
    {
        path: "/users-list",
        name: "ListaDeUsuarios",
        component: ListUser,
    },
    {
        path: "/users-edit/:id",
        name: "EditarUsuaario",
        component: EditUser,
    },
    {
        path: "/users-register",
        name: "CadastrarUsuario",
        component: RegiterUser,
    },

]