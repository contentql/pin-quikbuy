import { Product } from '@payload-types'
import { CollectionAfterChangeHook } from 'payload'

export const manageProductsCountInCategories: CollectionAfterChangeHook<
  Product
> = async ({ req, doc }) => {
  const { totalDocs: productCount } = await req.payload.count({
    collection: 'products',
    where: {
      category: {
        equals: doc?.category,
      },
    },
  })

  await req.payload.update({
    collection: 'categories',
    data: {
      productCount,
    },
    id: doc?.category as number,
  })

  return doc
}
