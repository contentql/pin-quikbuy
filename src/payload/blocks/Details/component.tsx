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

  // await fetch('https://app.snipcart.com/api/products', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization:
  //       'Basic U1RfTmpaaU1ESTJaVEF0TW1JeE5DMDBabU5rTFdFMU1UQXRabUl4WW1Ga09UUXhaakEyTmpNNE56RXdOek14TXpFd05UYzFPREV6',
  //     // 'X-Snipcart-Publicapikey':
  //     //   'NTA4MDhhZjUtMDQ3ZS00OTc2LTlkZTktOGRiZDczZDg4NmY4NjM4Njk5MjcwODQ4Mzk4OTUw',
  //   },
  //   body: JSON.stringify({
  //     fetchUrl: 'https://quikbuy.contentql.io/product/horizon-gaze-sunglasses',
  //   }),
  // })
  //   .then(res => res.json())
  //   .then(products => {
  //     console.log({ products })
  //   })
  //   .catch(err => {
  //     console.log({ err })
  //   })

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
