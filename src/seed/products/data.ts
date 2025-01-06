import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ProductDataType = RequiredDataFromCollectionSlug<'products'>
export type ProductImageType = {
  alt: string
  filePath: string
}

export const productsData: ProductDataType[] = [
  {
    name: 'Horizon Gaze Sunglasses',
    slug: 'horizon-gaze-sunglasses',
    description:
      'Protect your eyes in style with these chic sunglasses. Featuring polarized lenses, they offer superior UV protection. The lightweight frame provides comfort and a timeless look.tem',
    brand: 'temp',
    stock: 10,
    price: 20,

    discount: {
      percentage: null,
      startDate: null,
      endDate: null,
    },
    finalPrice: 20,

    category: 'Apparel' as any,

    tags: [],

    attributes: [],

    images: [0],
    isFeatured: false,
    isNewArrival: false,
    isSpecialOffer: false,
    isShippable: true,

    additionalInformationSections: [],
    _status: 'published',
  },
]

export const productsImagesData: ProductImageType[] = [
  {
    alt: 'Sun glasses',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/sun-glasses.webp',
    ),
  },
]
