export interface Rental {
    consumerId: string,
    movieId: string
    userId: string
    startDate: string,
    endDate: string
    movieTitle: string
    status: "rented" | "returned"
}