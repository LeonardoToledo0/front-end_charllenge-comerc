export interface BaseTable {
    id?: string;
    name: string;
    email?: string;
    status?: string;
    phone?: string;
    document?: string;
    lastName?: string;
    firstName?: string;
    password?: string;
    movieTitle?: string
    startDate?: string,
    endDate?: string
    consumerId?: string,

}
export interface Address {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}