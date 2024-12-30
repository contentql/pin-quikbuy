import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const categoryRouter = router({
  getAllCategories: publicProcedure.query(async () => {
    try {
      const { docs: categories } = await payload.find({
        collection: 'categories',
      })

      return categories
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }),

  getCategoryByName: publicProcedure
    .input(z.object({ categoryName: z.string() }))
    .query(async ({ input }) => {
      const { categoryName } = input

      try {
        const { docs: categories } = await payload.find({
          collection: 'categories',
          where: {
            slug: {
              equals: categoryName,
            },
          },
          limit: 1,
        })

        if (categories.length > 0) {
          return categories[0].id
        } else {
          throw new Error(`Category with name "${categoryName}" not found.`)
        }
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
      }
    }),
})
