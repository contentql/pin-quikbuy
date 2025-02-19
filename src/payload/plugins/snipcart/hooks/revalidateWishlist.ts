import { Wishlist } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateWishlistAfterChange: CollectionAfterChangeHook<
  Wishlist
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-wishlist')
    revalidateTag(`details-wishlist-${doc?.id}`)
  }
}

export const revalidateWishlistAfterDelete: CollectionAfterDeleteHook<
  Wishlist
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-wishlist')
    revalidateTag(`details-wishlist-${doc?.id}`)
  }
}
