import { snipcartAPI } from '../../../lib/snipcart/utils/snipcartAPI'
import { SNIPCART_LOCAL_DEV_URL } from '../../../utils/constants'
import { Product } from '@payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const createOrFetchSnipcartProduct: CollectionAfterChangeHook<
  Product
> = async ({ doc, operation }) => {
  if (operation === 'create') {
    try {
      const response = await snipcartAPI({
        endpoint: '/products',
        method: 'POST',
        data: {
          fetchUrl: `${process.env.NODE_ENV === 'development' ? SNIPCART_LOCAL_DEV_URL : ''}/shop/${doc.slug}`,
        },
      })

      console.log('Snipcart products synced successfully:', response.data)
    } catch (error) {
      console.error('Error syncing product with Snipcart (POST):', error)
    }
  }
}
