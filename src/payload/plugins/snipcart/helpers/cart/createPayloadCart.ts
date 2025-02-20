'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayload } from 'payload'

/**
 * Creates the cart in Payload based on Snipcart item data.
 */
export const createPayloadCart = async (
  user: User,
  cart: any,
): Promise<void> => {
  try {
    const payload = await getPayload({ config: configPromise })

    const mappedItems = await Promise.allSettled(
      cart.items?.items?.map(async (item: any) => {
        const { docs: products } = await payload.find({
          collection: 'products',
          where: {
            slug: {
              equals: item.id,
            },
          },
        })
        const product = products.at(0)

        return {
          product: product?.id,
          snipcartId: item.uniqueId,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        }
      }),
    )

    // Filter out null values from items
    const filteredItems = mappedItems
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(Boolean)

    await payload.create({
      collection: 'cart',
      data: {
        user: user.id,
        snipcartId: cart.token,
        items: filteredItems,
        totalPrice: cart.total,
      },
    })
  } catch (error) {
    console.error('Error creating cart in Payload:', error)
  }
}
