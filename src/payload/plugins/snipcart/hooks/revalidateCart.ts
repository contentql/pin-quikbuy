import { Cart } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateCartAfterChange: CollectionAfterChangeHook<
  Cart
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cart')
    revalidateTag(`details-cart-${doc?.id}`)
  }
}

export const revalidateCartAfterDelete: CollectionAfterDeleteHook<
  Cart
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-cart')
    revalidateTag(`details-cart-${doc?.id}`)
  }
}
