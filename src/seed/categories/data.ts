import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type CategoryDataType = RequiredDataFromCollectionSlug<'categories'>

export type CategoryImageType = {
  alt: string
  filePath: string
}

export const categoriesData: CategoryDataType[] = [
  {
    name: 'Apparel',
    slug: 'apparel',
    description: null,
    parentCategory: null,

    subCategories: [],
    isFeatured: false,

    image: 0,

    productCount: 2,

    meta: {
      title: null,
      description: null,
      image: null,
    },
    _status: 'published',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: null,
    parentCategory: null,

    subCategories: [],
    isFeatured: false,

    image: 1,

    productCount: 1,

    meta: {
      title: null,
      description: null,
      image: null,
    },
    _status: 'published',
  },
]

export const categoriesImagesData: CategoryImageType[] = [
  {
    alt: 'apparel image',
    filePath: path.join(
      process.cwd() + '/public/images/seed/categories/apparel.webp',
    ),
  },
  {
    alt: 'accessories image',
    filePath: path.join(
      process.cwd() + '/public/images/seed/categories/accessories.webp',
    ),
  },
  {
    alt: 'digital image',
    filePath: path.join(
      process.cwd() + '/public/images/seed/categories/digital.webp',
    ),
  },
]
