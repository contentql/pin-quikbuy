import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { productsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<string | Page> => {
  try {
    spinner.start(`Started created products page...`)

    const result = await payload.create({
      collection: 'pages',
      data: productsPageData,
    })

    spinner.start(`Successfully created products page.`)

    return result
  } catch (error) {
    spinner.succeed(`Failed to create products page.`)

    throw error
  }
}

export default seed
