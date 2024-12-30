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

// Update an item in the cart
export const updateItemInPayloadCart = async (
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
      cart.items?.map(cartItem => {
        if (cartItem.snipcartId === item.uniqueId) {
          return {
            ...cartItem,
            quantity: item.quantity,
            total: item.quantity * (cartItem.price || 0),
          }
        }
        return cartItem
      }) || []

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

    console.log('Item updated in cart.')
  } catch (error) {
    console.error('Error updating item in cart:', error)
  }
}
