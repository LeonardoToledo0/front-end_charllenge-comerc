import { defineStore } from 'pinia'
import type { ConsumerRegister } from '../types/interface.consumer'

export const useConsumerStore = defineStore('consumer', {
    state: () => ({
        consumers: [] as ConsumerRegister[],
    }),

    getters: {
        allConsumers: (state) => state.consumers,
    },

    actions: {
        loadConsumers() {
            const stored = localStorage.getItem('consumers')
            this.consumers = stored ? JSON.parse(stored) : []
        },

        saveConsumers() {
            localStorage.setItem('consumers', JSON.stringify(this.consumers))
        },

        addConsumer(consumer: ConsumerRegister) {
            this.consumers.push(consumer)
            this.saveConsumers()
        },

        updateConsumer(updatedConsumer: ConsumerRegister) {
            const index = this.consumers.findIndex(c => c.id === updatedConsumer.id)
            if (index !== -1) {
                this.consumers[index] = updatedConsumer
                this.saveConsumers()
            } else {
                console.warn('Cliente não encontrado para atualizar:', updatedConsumer.id)
            }
        },

        clearConsumers() {
            this.consumers = []
            localStorage.removeItem('consumers')
        }
    }
})
