'use server'

import promiseConfig from '@payload-config'
import { User } from '@payload-types'
// Utility to get and set cookies
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

export const checkAndSetSnipcartCart = async ({ user }: { user: User }) => {
  const SNIPCART_CART_KEY = 'snipcart-cart'

  try {
    const payload = await getPayload({ config: promiseConfig })

    // Check if the 'snipcart-cart' value exists in cookies
    const cookieStore = await cookies()

    const oldSnipcartId = cookieStore.get(SNIPCART_CART_KEY)?.value || ''

    // Fetch cart data for the user
    const { docs: carts, totalDocs: isCartExist } = await payload.find({
      collection: 'cart',
      where: {
        user: {
          equals: user?.id,
        },
      },
    })
    const cartData = carts.at(0)

    if (!isCartExist) {
      throw new Error('Failed to fetch cart')
    }

    if (!cartData?.snipcartId) {
      throw new Error('Cart data does not contain a valid snipcartId')
    }

    // Set the fetched cart ID in cookies
    cookieStore.set(SNIPCART_CART_KEY, cartData.snipcartId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    // Return a response indicating success
    return {
      snipcartId: cartData.snipcartId,
      oldSnipcartId,
      message: 'Cart token set successfully.',
    }
  } catch (error) {
    console.error('Error checking or setting Snipcart cart:', error)
    return {
      error: true,
      message: 'Failed to set Snipcart cart token.',
    }
  }
}
