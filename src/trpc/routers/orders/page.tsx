import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const ordersRouter = router({
  getProductsByCategory: publicProcedure.query(async () => {
    try {
      const { docs: orders } = await payload.find({
        collection: 'orders',
      })

      return orders
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }),
})
