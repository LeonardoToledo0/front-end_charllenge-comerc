export interface BaseRegistration {
    type: 'users' | 'consumer'
    inputs: {
        id: string,
        label: string,
        type: string,
        placeholder?: string,
        required?: boolean,
        mask?: string
    }[],
    isLoading: boolean,
    form: Record<string, any>,
    onSubmit?: (data: any) => any
}


