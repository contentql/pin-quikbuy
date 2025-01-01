import { snipcartAPI } from '../../../utils/snipcartAPI'
import { Product } from '@payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const updateSnipcartProduct: CollectionAfterChangeHook<
  Product
> = async ({ doc, previousDoc, operation }) => {
  if (operation !== 'update') return

  try {
    const response = await snipcartAPI({
      endpoint: `/products/${doc.id}`,
      method: 'PUT',
      data: {
        stock: doc.stock,
      },
    })

    console.log('Snipcart product updated successfully:', response.data)
  } catch (error) {
    console.error('Error updating product in Snipcart (PUT):', error)
  }
}
