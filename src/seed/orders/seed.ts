import configPromise from '@payload-config'
import { Order, Product } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { OrdersDataType, ordersData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | Order)[]> => {
  try {
    spinner.start(`Started creating orders...`)

    const { docs: products } = await payload.find({
      collection: 'products',
    })

    const { docs: users } = await payload.find({
      collection: 'users',
      limit: 1,
      where: {
        username: {
          equals: 'admin',
        },
      },
    })
    const userId = users.at(0)?.id as number

    const formattedOrdersData: OrdersDataType[] = ordersData.map(product => {
      const formattedOrder: OrdersDataType = {
        ...product,
        user: userId,
        items: product.items.map(item => {
          const formattedItem = {
            ...item,
            product: products.find(
              product => product.slug === (item.product as Product).slug,
            )?.id as number,
          }

          return formattedItem
        }),
      }

      return formattedOrder
    })

    const results = await Promise.allSettled(
      formattedOrdersData.map(order =>
        payload.create({
          collection: 'orders',
          data: order,
        }),
      ),
    )
    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )

    spinner.succeed(`Successfully created orders.`)

    return formattedResults
  } catch (error) {
    spinner.fail(`Failed to create orders.`)

    throw error
  }
}

export default seed
