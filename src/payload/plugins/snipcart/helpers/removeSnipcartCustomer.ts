'use server'

import { cookies } from 'next/headers'

export const removeSnipcartCustomer = async () => {
  // Delete a Snipcart customer session
  try {
    // const response = await snipcartAPI({
    //   endpoint: '/v3/customers/session',
    //   method: 'DELETE',
    //   usePublicKey: true,
    // })

    const cookieStore = await cookies()
    cookieStore.delete('snipcart-customer')

    console.log('Snipcart customer session deleted successfully.')
  } catch (error) {
    console.log('Error deleting Snipcart customer session:', error)
  }
}
