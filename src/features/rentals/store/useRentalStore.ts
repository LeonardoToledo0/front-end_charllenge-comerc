import { defineStore } from 'pinia'
import type { Rental } from '../types/interface.rentals'
import { toast } from 'vue3-toastify'

export const useRentalStore = defineStore('rental', {
    state: () => ({
        rentals: [] as Rental[],
    }),

    actions: {
        loadRentals() {
            const stored = localStorage.getItem('listRentals')
            this.rentals = stored ? JSON.parse(stored) : []
        },

        saveRentals() {
            localStorage.setItem('listRentals', JSON.stringify(this.rentals))
        },

        addRental(rental: Rental) {
            const alreadyRented = this.rentals.some(
                r => r.movieId === rental.movieId && r.status === 'rented'
            )

            if (alreadyRented) {
                toast.error(`Filme "${rental.movieTitle}" já está alugado.`)
                return false
            }

            this.rentals.push(rental)
            this.saveRentals()
            toast.success(`Aluguel confirmado para o filme: ${rental.movieTitle}`)
            return true
        },

        clearRentals() {
            this.rentals = []
            localStorage.removeItem('listRentals')
        }
    }
})
