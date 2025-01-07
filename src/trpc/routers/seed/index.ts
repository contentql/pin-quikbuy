import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import ora from 'ora'
import { getPayload } from 'payload'

import { seedCategories } from '@/seed/categories'
import { seedHomePage } from '@/seed/home-page'
import { seedOrders } from '@/seed/orders'
import { seedOrdersPage } from '@/seed/orders-page'
import { seedProductDetailsPage } from '@/seed/product-details-page'
import { seedProducts } from '@/seed/products'
import { seedProductsPage } from '@/seed/products-page'
import { seedSiteSettings } from '@/seed/site-settings'
import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    const spinner = ora({
      text: 'Starting the seeding process...',
      color: 'cyan',
      spinner: 'dots',
    }).start()

    try {
      // Seed categories
      const { totalDocs: totalCategories } = await payload.count({
        collection: 'categories',
      })

      if (!totalCategories) {
        await seedCategories(spinner)
      } else {
        spinner.info('Categories already exist. Skipping seeding.')
      }

      // Seed products
      const { totalDocs: totalProducts } = await payload.count({
        collection: 'products',
      })

      if (!totalProducts) {
        await seedProducts(spinner)
      } else {
        spinner.info('Products already exist. Skipping seeding.')
      }

      // Seed orders
      const { totalDocs: totalOrders } = await payload.count({
        collection: 'orders',
      })

      if (!totalOrders) {
        await seedOrders(spinner)
      } else {
        spinner.info('Orders already exist. Skipping seeding.')
      }

      // Seed pages
      const { totalDocs: totalPages } = await payload.count({
        collection: 'pages',
      })

      if (!totalPages) {
        await seedProductsPage(spinner)
        await seedProductDetailsPage(spinner)
        await seedOrdersPage(spinner)
        await seedHomePage(spinner)
      } else {
        spinner.info('Pages already exist. Skipping seeding.')
      }

      // Seed site settings
      await seedSiteSettings(spinner)

      return { success: true }
    } catch (error: any) {
      spinner.fail('Error occurred during seeding.')
      console.error('Error seeding:', error)

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})
