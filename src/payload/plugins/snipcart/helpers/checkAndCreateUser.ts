'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayload } from 'payload'

/**
 * Create a user.
 */
export const checkAndCreateUser = async ({
  username,
  email,
  password,
}: {
  username: string
  email: string
  password: string
}): Promise<User | null> => {
  try {
    const payload = await getPayload({ config: configPromise })

    const { docs: existingUsers } = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })
    const existingUser = existingUsers.at(0)

    console.log({ existingUser })

    if (!existingUser) {
      const user = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          username,
          displayName: username.toUpperCase(),
          role: ['user'],
        },
      })

      return user || null
    }

    return existingUser || null
  } catch (error) {
    console.error('Error checking and creating user:', error)
    return null
  }
}
