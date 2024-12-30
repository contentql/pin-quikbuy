'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayload } from 'payload'

/**
 * Deletes the cart in Payload based on Snipcart item data.
 */
export const deletePayloadCart = async (
  user: User,
  item: any,
): Promise<void> => {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: carts } = await payload.find({
      collection: 'cart',
      where: {
        user: {
          equals: user.id,
        },
      },
    })

    const cart = carts.at(0)

    if (!cart) {
      console.error('Cart not found for user:', user)
      return
    }

    const updatedItems = cart.items.filter(
      (cartItem: any) => cartItem.product !== item.id,
    )

    if (updatedItems.length === 0) {
      // If no items remain, delete the entire cart
      await payload.delete({
        collection: 'cart',
        id: cart.id,
      })

      console.log('Cart deleted in Payload.')
    } else {
      // Otherwise, update the cart with the remaining items
      await payload.delete({
        collection: 'cart',
        where: {
          snipcartId: {
            equals: item.uniqueId,
          },
        },
      })

      console.log('Item removed, cart updated in Payload.')
    }
  } catch (error) {
    console.error('Error deleting cart in Payload:', error)
  }
}
