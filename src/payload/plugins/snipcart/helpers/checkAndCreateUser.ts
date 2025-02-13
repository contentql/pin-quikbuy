'use server'

import configPromise from '@payload-config'
import { User } from '@payload-types'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

/**
 * Creates a new user if one doesn't exist, or logs in an existing user.
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

    // Check if the user already exists
    const { docs: existingUsers } = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
    })
    const existingUser = existingUsers[0]

    console.log({ existingUser })

    // Get current date in ISO string format
    const currentDate = new Date().toISOString()

    // If the user does not exist, create a new user
    if (!existingUser) {
      const newUser = await createUser(
        payload,
        username,
        email,
        password,
        currentDate,
      )

      await setAuthCookie(payload, email, password)
      return newUser
    }

    // If the user exists, log them in and set the authentication cookie
    await setAuthCookie(payload, email, password)

    return existingUser
  } catch (error) {
    console.error('Error checking or creating user:', error)
    return null
  }
}

/**
 * Creates a new user in the system.
 */
const createUser = async (
  payload: any,
  username: string,
  email: string,
  password: string,
  currentDate: string,
) => {
  return payload.create({
    collection: 'users',
    data: {
      email,
      password,
      username,
      displayName: username.toUpperCase(),
      role: ['user'],
      _verified: true,
      emailVerified: currentDate,
    },
  })
}

/**
 * Logs the user in and sets the authentication cookie.
 */
const setAuthCookie = async (payload: any, email: string, password: string) => {
  const result = await payload.login({
    collection: 'users',
    data: { email, password },
    depth: 2,
    showHiddenFields: true,
  })

  const cookieStore = await cookies()
  cookieStore.set('payload-token', result.token || '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}
