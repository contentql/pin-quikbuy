import configPromise from '@payload-config'
import { SiteSetting } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<string | SiteSetting> => {
  try {
    spinner.start(`Started creating site settings...`)

    const result = await payload.updateGlobal({
      slug: 'site-settings',
      data: {},
    })

    spinner.start(`Successfully created site settings.`)

    return result
  } catch (error) {
    spinner.succeed(`Failed to create site settings.`)

    throw error
  }
}

export default seed
