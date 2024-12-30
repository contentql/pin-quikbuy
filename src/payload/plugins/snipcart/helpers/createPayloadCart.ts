'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayload } from 'payload'

/**
 * Creates the cart in Payload based on Snipcart item data.
 */
export const createPayloadCart = async (
  user: User,
  item: any,
): Promise<void> => {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        slug: {
          equals: item.id,
        },
      },
    })

    const product = products.at(0)

    if (!product) {
      console.error('Product not found for item:', item)
      return
    }

    await payload.create({
      collection: 'cart',
      data: {
        user: user.id,
        items: [
          {
            product: product.id as number,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
          },
        ],
        totalPrice: item.quantity * item.price,
        snipcartId: item.uniqueId,
      },
    })

    console.log('Cart created in Payload.')
  } catch (error) {
    console.error('Error creating cart in Payload:', error)
  }
}
