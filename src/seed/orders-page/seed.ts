import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { ordersPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<string | Page> => {
  try {
    spinner.start(`Started creating orders page...`)

    const result = await payload.create({
      collection: 'pages',
      data: ordersPageData,
    })

    spinner.succeed(`Successfully created orders page.`)

    return result
  } catch (error) {
    spinner.fail(`Failed to create orders page.`)

    throw error
  }
}

export default seed
