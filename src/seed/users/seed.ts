import configPromise from '@payload-config'
import { User } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { UserDataType, usersData, usersImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | User)[]> => {
  try {
    spinner.start(`Started creating users...`)

    const usersImagesResult = await Promise.allSettled(
      usersImagesData.map(image =>
        payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: image.filePath,
        }),
      ),
    )
    const formattedUsersImagesResult = usersImagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const formattedUsersData: UserDataType[] = usersData.map(user => {
      return {
        ...user,
        imageUrl: formattedUsersImagesResult[0].id,
      }
    })

    const usersResult = await Promise.allSettled(
      formattedUsersData.map(user =>
        payload.create({
          collection: 'users',
          data: user,
        }),
      ),
    )

    const formattedUsersResult = usersResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    spinner.succeed(`Successfully created users.`)

    return formattedUsersResult
  } catch (error) {
    spinner.fail(`Failed to create users.`)

    throw error
  }
}

export default seed
