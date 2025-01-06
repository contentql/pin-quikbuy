import { Page } from '@payload-types'

export type CategoriesDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export type CategoriesImageType = {
  alt: string
  filePath: string
}

export const categoriesData: CategoriesDataType = {
  title: 'Categories',
  layout: [{}],
}

// export const categoriesData = [
//   {
//     name: 'Apparel',
//     imageURL: [
//       {
//         url: process.cwd() + '/public/images/seed/categories/apparel.webp',
//         alt: 'apparel image',
//       },
//     ],
//   },
//   {
//     name: 'Accessories',
//     imageURL: [
//       {
//         url: process.cwd() + '/public/images/seed/categories/accessories.webp',
//         alt: 'accessories image',
//       },
//     ],
//   },
//   {
//     name: 'Digital',
//     imageURL: [
//       {
//         url: process.cwd() + '/public/images/seed/categories/digital.webp',
//         alt: 'digital image',
//       },
//     ],
//   },
// ]
