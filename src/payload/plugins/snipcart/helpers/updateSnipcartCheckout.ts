import { User } from '@payload-types'

/**
 * Updates Snipcart checkout details with user metadata.
 */
export const updateSnipcartCheckout = async (user: User): Promise<void> => {
  try {
    if (typeof window.Snipcart === 'undefined') return

    const { Snipcart } = window

    // @ts-ignore
    await Snipcart.api.cart.update({
      email: user.email,
      metadata: { payloadUserId: user.id },
    })
  } catch (error) {
    console.error('Error updating Snipcart checkout:', error)
  }
}
