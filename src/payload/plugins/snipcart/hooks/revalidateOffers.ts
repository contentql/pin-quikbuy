import { Offer } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateOffersAfterChange: CollectionAfterChangeHook<
  Offer
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-offers')
    revalidateTag(`details-offers-${doc?.slug}`)
  }
}

export const revalidateOffersAfterDelete: CollectionAfterDeleteHook<
  Offer
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-offers')
    revalidateTag(`details-offers-${doc?.slug}`)
  }
}
