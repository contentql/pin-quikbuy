import { Category } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCategories: CollectionAfterChangeHook<
  Category
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-categories')
    revalidateTag(`details-categories-${doc?.slug}`)
  }
}
