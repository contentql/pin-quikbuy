import { removeSnipcartCustomer } from '@/payload/plugins/snipcart/helpers/removeSnipcartCustomer'

export const signOut = async () => {
  try {
    const response = await fetch('/api/users/logout', { method: 'POST' })
    await removeSnipcartCustomer()

    return response.json()
  } catch (error) {
    console.error('Sign-out failed:', error)
  }
}
