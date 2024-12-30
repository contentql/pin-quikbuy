import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const productRouter = router({
  getProductsByCategory: publicProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(async ({ input }) => {
      const { categoryId } = input

      try {
        const { docs: products } = await payload.find({
          collection: 'products',
          where: {
            category: {
              equals: categoryId,
            },
          },
        })

        return products
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
      }
    }),

  getAllProducts: publicProcedure.query(async () => {
    try {
      const { docs: products } = await payload.find({
        collection: 'products',
      })

      return products
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }),
})
