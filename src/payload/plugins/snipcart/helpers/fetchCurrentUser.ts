import { env } from '@env'
import { User } from '@payload-types'

/**
 * Fetches the current logged-in user.
 */
export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_WEBSITE_URL}/api/users/me`, {
      credentials: 'include',
    })

    const { user }: { user: User } = await res.json()
    return user || null
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}
