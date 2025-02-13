import configPromise from '@payload-config'
import { Category, Page, Product } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { HomePageDataType, homePageImagesData, homepageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<string | Page> => {
  try {
    spinner.start(`Started creating home page...`)

    const { docs: products } = await payload.find({
      collection: 'products',
    })

    const { docs: categories } = await payload.find({
      collection: 'categories',
    })

    const homePageImagesResult = await Promise.allSettled(
      homePageImagesData.map(image =>
        payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: image.filePath,
        }),
      ),
    )
    const formattedHomePageImagesResult = homePageImagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const formattedHomePageData: HomePageDataType = {
      ...homepageData,
      layout: homepageData.layout?.map(block => {
        if (block.blockType === 'Home') {
          return {
            ...block,
            image: formattedHomePageImagesResult[0].id,
          }
        }

        if (block.blockType === 'FeaturedProducts') {
          return {
            ...block,
            featuredProducts: block.featuredProducts?.map(featuredProduct => {
              return {
                ...featuredProduct,
                products: featuredProduct.products?.map(product => {
                  return products.find(
                    p => p.slug === (product as Product).slug,
                  )?.id as number
                }),
              }
            }),
          }
        }

        if (block.blockType === 'Categories') {
          return {
            ...block,
            categories: block.categories?.map(category => {
              return {
                ...category,
                category: categories.find(
                  c => c.slug === (category.category as Category).slug,
                ),
              }
            }),
          }
        }

        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: formattedHomePageData,
    })

    spinner.succeed(`Successfully created home page.`)

    return result
  } catch (error) {
    spinner.fail(`Failed to create home page.`)

    throw error
  }
}

export default seed
