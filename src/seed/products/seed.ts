import configPromise from '@payload-config'
import { Category, Product } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { ProductDataType, productsData, productsImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | Product)[]> => {
  try {
    spinner.start(`Started created products...`)

    const { docs: categories } = await payload.find({
      collection: 'categories',
    })

    const productImagesResult = await Promise.allSettled(
      productsImagesData.map(image =>
        payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: image.filePath,
        }),
      ),
    )
    const formattedProductImagesResult = productImagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    let productImageIndex = 0

    const formattedProductsData: ProductDataType[] = productsData.map(
      product => {
        const formattedProduct: ProductDataType = {
          ...product,
          images: product.images.map(() => {
            const image = formattedProductImagesResult[productImageIndex].id
            productImageIndex++

            return image
          }),
          category: categories.find(
            category => category.name === (product.category as Category).name,
          )?.id as number,
        }

        return formattedProduct
      },
    )

    const results = await Promise.allSettled(
      formattedProductsData.map(productData =>
        payload.create({
          collection: 'products',
          data: productData,
        }),
      ),
    )
    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )

    spinner.start(`Successfully created products.`)

    return formattedResults
  } catch (error) {
    spinner.succeed(`Failed to create products`)

    throw error
  }
}

export default seed
