import type { RouteRecordRaw } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: "login",
        name: "login",
        component: Login,
    },
    {
        path: "register",
        name: "register",
        component: Register,
    },
];
