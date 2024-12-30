import { Cart } from '@payload-types'
import { CollectionBeforeChangeHook } from 'payload'

export const deleteOldCarts: CollectionBeforeChangeHook<Cart> = async ({
  req,
  data,
  operation,
}) => {
  const { payload } = req

  if (operation === 'create') {
    const { user } = data

    try {
      const { docs: carts } = await payload.find({
        collection: 'cart',
        where: {
          user: {
            equals: user,
          },
        },
      })

      if (carts.length > 0) {
        // Delete each cart
        for (const cart of carts) {
          await payload.delete({ collection: 'cart', id: cart.id })
        }
        console.log(`Deleted ${carts.length} old carts for user: ${user}`)
      }
    } catch (error) {
      console.error('Error deleting old carts:', error)
      throw error
    }
  }

  return data
}
