import { ref, computed } from 'vue'

export const searchValue = ref('')
export const searchType = ref<'movies' | 'users' | 'consumer' | 'rentals'>('users')
export const rows = ref<any[]>([])

export const filteredRows = computed(() => {
    if (!searchValue.value) return rows.value

    const term = searchValue.value.toLowerCase()

    switch (searchType.value) {
        case 'movies':
            return rows.value.filter(item =>
                (item.Title?.toLowerCase().includes(term)) ||
                (item.Status?.toLowerCase().includes(term))
            )
        case 'users':
            return rows.value.filter(item =>
                (item.name?.toLowerCase().includes(term)) ||
                (item.email?.toLowerCase().includes(term)) ||
                (item.status?.toLowerCase().includes(term))
            )

        case 'consumer':
            return rows.value.filter(item =>
                (item.name?.toLowerCase().includes(term)) ||
                (item.document?.toLowerCase().includes(term)) ||
                (item.status?.toLowerCase().includes(term))
            )

        case 'rentals':
            return rows.value.filter(item =>
                (item.status?.toLowerCase().includes(term))
            )

        default:
            return rows.value
    }
})
