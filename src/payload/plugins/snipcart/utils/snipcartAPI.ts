import { env } from '@env'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { snipcartAPIAxiosInstance } from './snipcartAPIAxiosInstance'

interface SnipcartAPIOptions {
  endpoint: string // REST API endpoint
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' // HTTP method
  data?: Record<string, any> // Request payload for POST or PUT
  config?: AxiosRequestConfig // Optional Axios request configuration options
  usePublicKey?: boolean // Whether to use the X-Snipcart-Publicapikey header
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
 * @param {boolean} [options.usePublicKey=false] - Whether to use the X-Snipcart-Publicapikey header.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 *
 * @throws {Error} - Throws an error if the request fails or if required API keys are missing.
 */
export const snipcartAPI = async <T = any>({
  endpoint,
  method = 'GET',
  data = {},
  config = {},
  usePublicKey = false,
}: SnipcartAPIOptions): Promise<T> => {
  // Determine the API key to use
  const apiKey = usePublicKey
    ? env.SNIPCART_PUBLIC_API_KEY
    : env.SNIPCART_SECRET_API_KEY

  // Throw an error if the required API key is not provided
  if (!apiKey) {
    throw new Error(
      `Missing API key: ${
        usePublicKey ? 'SNIPCART_PUBLIC_API_KEY' : 'SNIPCART_SECRET_API_KEY'
      }`,
    )
  }

  try {
    // Prepare the headers based on the key being used
    const headers = {
      ...(usePublicKey
        ? { 'X-Snipcart-Publicapikey': apiKey }
        : { Authorization: `Basic ${btoa(apiKey)}` }),
      ...config.headers,
    }

    // Make the HTTP request using the Axios instance and provided options
    const response: AxiosResponse<T> = await snipcartAPIAxiosInstance.request({
      url: endpoint,
      method,
      data: method === 'GET' ? undefined : data,
      headers,
      ...config,
    })

    // Return only the response data
    return response.data
  } catch (error: any) {
    // Rethrow the error to allow further handling upstream
    throw new Error(`Snipcart API error: ${error.message || error}`)
  }
}
