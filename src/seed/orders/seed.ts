import configPromise from '@payload-config'
import { Order, Product } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { OrdersDataType, ordersData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | Order)[]> => {
  try {
    spinner.start(`Started created orders...`)

    const { docs: products } = await payload.find({
      collection: 'products',
    })

    const formattedOrdersData: OrdersDataType[] = ordersData.map(product => {
      const formattedOrder: OrdersDataType = {
        ...product,
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

    spinner.start(`Successfully created orders.`)

    return formattedResults
  } catch (error) {
    spinner.succeed(`Failed to create orders.`)

    throw error
  }
}

export default seed
