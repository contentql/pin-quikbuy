'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayload } from 'payload'

type SnipcartItemType = {
  id: string
  uniqueId: string
  quantity: number
  price?: number
}

// Fetch the user's cart
export const fetchUserCart = async (user: User) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: carts } = await payload.find({
    collection: 'cart',
    where: {
      user: {
        equals: user.id,
      },
    },
  })
  return carts.at(0)
}
