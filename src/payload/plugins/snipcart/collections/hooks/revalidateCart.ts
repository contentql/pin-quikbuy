import { Cart } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCart: CollectionAfterChangeHook<Cart> = async ({
  doc,
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cart')
    revalidateTag(`details-cart-${doc?.id}`)
  }
}
