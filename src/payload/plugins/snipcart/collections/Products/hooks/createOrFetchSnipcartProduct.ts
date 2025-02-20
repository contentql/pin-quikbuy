import { snipcartAPI } from '../../../utils/snipcartAPI'
import { env } from '@env'
import { Product } from '@payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const createOrFetchSnipcartProduct: CollectionAfterChangeHook<
  Product
> = async ({ doc, operation, previousDoc }) => {
  if (operation === 'create') {
    try {
      const response = await snipcartAPI({
        endpoint: '/products',
        method: 'POST',
        data: {
          fetchUrl: `${process.env.NODE_ENV !== 'production' ? process.env.SNIPCART_LOCAL_DEV_URL : env.PAYLOAD_URL}/product/${doc.slug}`,
        },
      })
    } catch (error) {
      console.error('Error creating product with Snipcart:', error)
    }
  }

  if (operation === 'update') {
    try {
      const snipcartProductId = previousDoc.slug || previousDoc?.snipcartId
      if (!snipcartProductId) {
        console.error('No Snipcart product ID found. Cannot update product.')
        return
      }

      const response = await snipcartAPI({
        endpoint: `/products/${snipcartProductId}`,
        method: 'PUT',
        data: {
          // inventoryManagementMethod: doc.attributes?.filter(
          //   ({ value }) => value.type === 'select',
          // ).length
          //   ? 'Variant'
          //   : 'Single',
          stock: doc.stock,
          allowOutOfStockPurchases: false,
          // variants: [
          //   { name: 'Size', option: '32GB' },
          //   { name: 'Color', option: 'Black ' },
          // ],
        },
      })
    } catch (error) {
      console.error('Error updating product with Snipcart:', error)
    }
  }
}
