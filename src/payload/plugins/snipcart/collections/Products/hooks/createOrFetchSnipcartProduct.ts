import { snipcartAPI } from '../../../lib/snipcart/utils/snipcartAPI'
import { env } from '@env'
import { Product } from '@payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const createOrFetchSnipcartProduct: CollectionAfterChangeHook<
  Product
> = async ({ doc, operation }) => {
  if (operation !== 'create') return // Only run for creation operations.

  try {
    const response = await snipcartAPI({
      endpoint: '/products',
      method: 'POST',
      data: {
        fetchUrl: `${env.PAYLOAD_URL}/shop/${doc.id}`, // Fetch products from Payload's endpoint.
      },
    })

    console.log('Snipcart products synced successfully:', response.data)
  } catch (error) {
    console.error('Error syncing product with Snipcart (POST):', error)
  }
}
