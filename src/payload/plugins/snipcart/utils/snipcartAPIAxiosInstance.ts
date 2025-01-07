import axios, { AxiosInstance } from 'axios'

// Creating an Axios instance with default configuration
export const snipcartAPIAxiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://app.snipcart.com/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Add other custom default headers here
  },
})
