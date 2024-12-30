'use server'

import configPromise from '@payload-config'
import { Product, User } from '@payload-types'
import { getPayload } from 'payload'

/**
 * Updates the cart in Payload based on Snipcart item data.
 */
export const updatePayloadCart = async (
  user: User,
  item: any,
): Promise<void> => {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: carts } = await payload.find({
      collection: 'cart',
      where: {
        snipcartId: {
          equals: item.uniqueId,
        },
      },
    })
    const cart = carts.at(0)

    if (!cart) {
      console.error('Cart not found for user:', user)
      return
    }

    const updatedItems = cart.items.map(cartItem => {
      if ((cartItem.product as Product).slug === item.id) {
        return {
          ...cartItem,
          quantity: item.quantity,
          total: item.quantity * cartItem.price,
        }
      }
      return cartItem
    })

    await payload.update({
      collection: 'cart',
      data: {
        items: updatedItems,
        totalPrice: updatedItems.reduce(
          (sum: number, cartItem) => sum + (cartItem.total || 0),
          0,
        ),
      },
      where: {
        snipcartId: {
          equals: item.uniqueId,
        },
      },
    })

    console.log('Cart updated in Payload.')
  } catch (error) {
    console.error('Error updating cart in Payload:', error)
  }
}
