import { snipcartAPI } from '../../../utils/snipcartAPI'
import { Product } from '@payload-types'
import { CollectionAfterDeleteHook } from 'payload'

export const deleteSnipcartProduct: CollectionAfterDeleteHook<
  Product
> = async ({ doc }) => {
  try {
    const response = await snipcartAPI({
      endpoint: `/products/${doc.slug}`,
      method: 'DELETE',
    })

    console.log('Snipcart product deleted successfully:', response)
  } catch (error) {
    console.error('Error deleting product in Snipcart (DELETE):', error)
  }
}
