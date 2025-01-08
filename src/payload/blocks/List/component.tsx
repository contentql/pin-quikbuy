import { Params } from '../types'
import configPromise from '@payload-config'
import { ListType } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'

import { getCachedSiteSettings } from '@/utils/getCachedSiteSettings'
import { getCurrentUser } from '@/utils/getCurrentUser'

import OrderList from './components/OrdersList'
import ShopPage from './components/ShopPage'

interface ListProps extends ListType {
  params: Params
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const metadata = await getCachedSiteSettings()
  const {
    redirectionLinks,
    general: { currency },
  } = metadata

  const productRedirectionLink = redirectionLinks?.productLink
  const slug =
    productRedirectionLink && typeof productRedirectionLink.value === 'object'
      ? productRedirectionLink.value.path!
      : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  switch (block?.collectionSlug) {
    case 'products': {
      const { docs: products } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'products',
            depth: 10,
            limit: 1000,
          }),
        ['products', 'allProducts'],
        { tags: ['list-products'] },
      )()

      return (
        <ShopPage
          products={products}
          slicedSlug={slicedSlug}
          currency={currency}
        />
      )
    }

    case 'orders': {
      const listHeaders = await headers()
      const user = await getCurrentUser(listHeaders)

      const { docs: orders = [] } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'orders',
            depth: 10,
            limit: 1000,
            where: {
              user: {
                equals: user?.id,
              },
            },
          }),
        ['orders', 'allOrders'],
        { tags: ['list-orders'] },
      )()

      return <OrderList orders={orders} />
    }
  }
}

export default List
