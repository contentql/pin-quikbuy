import { env } from '@env'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { snipcartAPIAxiosInstance } from './snipcartAPIAxiosInstance'

interface SnipcartAPIOptions {
  endpoint: string // REST API endpoint
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' // HTTP method
  data?: Record<string, any> // Request payload for POST or PUT
  config?: AxiosRequestConfig // Optional Axios request configuration options
}

/**
 * A function to make REST API requests using Axios for Snipcart operations.
 *
 * @template T - The type of the response data.
 * @param {SnipcartAPIOptions} options - The options for the REST API request.
 * @param {string} options.endpoint - The REST API endpoint (relative to the base URL).
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} [options.method='GET'] - The HTTP method to use.
 * @param {Record<string, any>} [options.data] - The payload for POST or PUT requests.
 * @param {AxiosRequestConfig} [options.config={}] - Optional Axios request configuration options.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 *
 * @throws {Error} - Throws an error if the request fails.
 */
export const snipcartAPI = async <T = any>({
  endpoint,
  method = 'GET',
  data = {},
  config = {},
}: SnipcartAPIOptions): Promise<T> => {
  try {
    // Merge headers from config with default headers.
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(env.SNIPCART_SECRET_API_KEY || '')}`,
      ...config.headers,
    }

    // Make the HTTP request using the Axios instance and provided options.
    const response: AxiosResponse<T> = await snipcartAPIAxiosInstance.request({
      url: endpoint,
      method,
      data: method === 'GET' ? undefined : data,
      headers,
      ...config,
    })

    // Return only the response data.
    return response.data
  } catch (error: any) {
    // Rethrow the error to allow further handling upstream.
    throw new Error(`Snipcart API error: ${error.message || error}`)
  }
}
