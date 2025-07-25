interface SearchBase {
    type: 'movies' | 'users' | 'consumer' | 'rentals'
    startDate?: string
    endDate?: string
}

interface MovieSearch extends SearchBase {
    type: 'movies'
    movieId?: string
    movieName?: string
    movieStatus?: 'rented' | 'returned'
}

interface UserSearch extends SearchBase {
    type: 'users'
    userId?: string
    name?: string
    email?: string
    userStatus?: 'active' | 'inactive'
}

interface ConsumerSearch extends SearchBase {
    type: 'consumer'
    consumerId?: string
    consumerName?: string
    document?: string
    consumerStatus?: 'active' | 'inactive'
}

export interface RentalSearch extends SearchBase {
    type: 'rentals'
    consumerId?: string
    movieId?: string
    userId?: string
    status?: 'rented' | 'returned'
}

export type BaseSearch = MovieSearch | UserSearch | ConsumerSearch | RentalSearch

export interface PlaceholderSearch {
    type: 'movies' | 'users' | 'consumer' | 'rentals'
    placeholder: string
}
