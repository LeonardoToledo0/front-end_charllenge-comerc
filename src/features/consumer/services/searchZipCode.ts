import { apiZipCode } from "../../../shared/services/interception";
import type { BaseZipCode } from "../types/interface.consumer";

export const searchZipCode = async (zipCode: string): Promise<BaseZipCode> => {
    try {
        const response = await apiZipCode.get(`${zipCode}/json/`)
        console.log('response:', response.data)
        return response.data
    } catch (error) {
        console.error('Erro ao buscar Cep:', error)
        throw error
    }
}