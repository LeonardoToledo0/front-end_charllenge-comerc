export interface BaseAuth {
    type: 'login' | 'register'
    inputs: {
        id: string
        label: string
        type: string
        placeholder?: string
        required?: boolean
        mask?: string
    }[]
    isLoading: boolean
}