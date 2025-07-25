export interface UserRegister {
    id: string
    name: string
    document: string
    password: string
    passwordConfirmation?: string
    status: 'active' | 'inactive'
}

export interface UserLogin {
    document: string
    password: string
}
