import { Params } from '../types'
import configPromise from '@payload-config'
import { DetailsType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import ProductDetails from './components/ProductDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'products': {
      const slug = params?.route?.at(-1) ?? ''

      const product = await unstable_cache(
        async () => {
          const { docs } = await payload.find({
            collection: 'products',
            where: {
              slug: {
                equals: slug,
              },
            },
          })

          return docs.at(0)
        },
        ['details', 'product', slug],
        { tags: [`details-products-${slug}`] },
      )()

      return (
        <ProductDetails route={params?.route?.join('/')} product={product} />
      )
    }
  }
}

export default Details
