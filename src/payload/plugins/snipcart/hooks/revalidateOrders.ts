import { Order } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateOrdersAfterChange: CollectionAfterChangeHook<
  Order
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-orders')
    revalidateTag(`details-orders-${doc?.id}`)
  }
}

export const revalidateOrdersAfterDelete: CollectionAfterDeleteHook<
  Order
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-orders')
    revalidateTag(`details-orders-${doc?.id}`)
  }
}
