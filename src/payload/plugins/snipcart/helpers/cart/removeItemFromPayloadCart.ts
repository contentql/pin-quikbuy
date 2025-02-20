'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayload } from 'payload'

import { fetchUserCart } from './fetchCartUser'

type SnipcartItemType = {
  id: string
  uniqueId: string
  quantity: number
  price?: number
}

// Remove an item from the cart
export const removeItemFromPayloadCart = async (
  user: User,
  item: SnipcartItemType,
): Promise<void> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const cart = await fetchUserCart(user)

    if (!cart) {
      console.error('Cart not found for user:', user)
      return
    }

    const updatedItems =
      cart.items?.filter(cartItem => cartItem.snipcartId !== item.uniqueId) ||
      []

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
          equals: cart.snipcartId,
        },
      },
    })
  } catch (error) {
    console.error('Error removing item from cart:', error)
  }
}
