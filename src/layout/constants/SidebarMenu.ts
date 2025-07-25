import { ArrowLeftCircleIcon, UserIcon, Squares2X2Icon, PlayCircleIcon, UsersIcon, UserPlusIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";

export const MenuGroup = [
    {
        title: 'Filmes',
        icon: PlayCircleIcon,
        path: 'movies'
    },
    {
        title: 'Clientes',
        icon: UsersIcon,
        path: '/consumer-list',
    },
    {
        title: 'Cadastrar Cliente',
        path: '/consumer-register',
        icon: UserPlusIcon
    },
    {
        title: 'Usuários',
        icon: UserIcon,
        path: '/users-list',

    },
    {
        title: 'Cadastrar Usuário',
        path: '/users-register',
        icon: PlusCircleIcon
    },
    {
        title: 'Locação',
        icon: Squares2X2Icon,
        path: '/rentals'
    },
    {
        title: 'Sair',
        icon: ArrowLeftCircleIcon,
        path: '/auth/login'
    }

]
