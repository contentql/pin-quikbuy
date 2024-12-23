import { Order } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateOrders: CollectionAfterChangeHook<Order> = async ({
  doc,
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-orders')
    revalidateTag(`details-orders-${doc?.id}`)
  }
}
