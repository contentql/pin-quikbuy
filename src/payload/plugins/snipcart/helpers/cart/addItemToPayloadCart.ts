'use server'

import configPromise from '@payload-config'
import { Cart, User } from '@payload-types'
import { getPayload } from 'payload'

import { fetchUserCart } from './fetchCartUser'

type SnipcartItemType = {
  id: string
  uniqueId: string
  quantity: number
  price?: number
}

// Add an item to the cart
export const addItemToPayloadCart = async (
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
      console.error('Product not found:', item.id)
      return
    }

    const newItem: NonNullable<Cart['items']>[number] = {
      product: product.id,
      snipcartId: item.uniqueId,
      quantity: item.quantity,
      price: item.price || product.price,
      total: (item.price || product.price) * item.quantity,
    }

    const updatedItems = [...(cart.items || []), newItem]

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
    console.error('Error adding item to cart:', error)
  }
}
