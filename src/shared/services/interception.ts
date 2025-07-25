import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
    if (config.params) {
        config.params['apikey'] = import.meta.env.VITE_API_KEY
    } else {
        config.params = { apikey: import.meta.env.VITE_API_KEY }
    }
    return config
})

export const apiZipCode = axios.create({
    baseURL: import.meta.env.VITE_API_ZIPCODE
})

apiZipCode.interceptors.request.use(config => {
    config.params = { format: 'json' }
    return config
})
