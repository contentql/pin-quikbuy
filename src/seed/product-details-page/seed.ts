import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { ProductDetailsPageDataType, productDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<string | Page> => {
  try {
    spinner.start(`Started created product details page...`)

    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'products',
        },
      },
    })
    const productsPage = pages.at(0)

    const formattedProductDetailsPageData: ProductDetailsPageDataType = {
      ...productDetailsPageData,
      parent: productsPage?.id,
    }

    const result = await payload.create({
      collection: 'pages',
      data: formattedProductDetailsPageData,
    })

    spinner.start(`Successfully created product details page.`)

    return result
  } catch (error) {
    spinner.succeed(`Failed to create product details page.`)

    throw error
  }
}

export default seed
