import type { RouteRecordRaw } from "vue-router";
import ListOfRentals from "../pages/ListOfRentals.vue";

export const rentalsRoutes: RouteRecordRaw[] = [
    {
        path: "/rentals",
        name: "Locação",
        component: ListOfRentals,
    },

]