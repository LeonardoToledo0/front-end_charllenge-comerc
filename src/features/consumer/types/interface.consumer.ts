export interface ConsumerRegister {
    id: string
    firstName: string
    lastName: string
    document: string
    email: string
    phone: string
    address: [
        {
            street: string
            number: string
            neighborhood: string
            city: string
            state: string
            country: string
            zipCode: string
        }
    ]
}
export interface BaseZipCode {
    zipCode: string
    logradouro: string
    bairro: string
    cidade: string
    estado: string
    localidade: string
    uf: string
}