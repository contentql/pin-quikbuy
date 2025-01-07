import { RequiredDataFromCollectionSlug } from 'payload'

export type OrdersPageDataType = RequiredDataFromCollectionSlug<'pages'>

export const ordersPageData: OrdersPageDataType = {
  title: 'orders',

  layout: [
    {
      id: '677535664a83b61299800006',
      title: null,
      collectionSlug: 'orders',
      blockName: null,
      blockType: 'List',
    },
  ],

  meta: {
    title: null,
    description: null,
    image: null,
  },
  isHome: false,
  isDynamic: false,
  slugMode: 'generate',
  slug: 'orders',
  pathMode: 'generate',
  path: '/orders',
  parent: null,

  _status: 'published',
}
