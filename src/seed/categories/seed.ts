import configPromise from '@payload-config'
import { Category } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { CategoryDataType, categoriesData, categoriesImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<(string | Category)[]> => {
  try {
    spinner.start(`Started creating categories...`)

    const categoryImagesResult = await Promise.allSettled(
      categoriesImagesData.map(image =>
        payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: image.filePath,
        }),
      ),
    )
    const formattedCategoryImagesResult = categoryImagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    let categoryImageIndex = 0

    const formattedCategoriesData: CategoryDataType[] = categoriesData.map(
      category => {
        const formattedCategory: CategoryDataType = {
          ...category,
          image: formattedCategoryImagesResult[categoryImageIndex].id,
        }
        categoryImageIndex++

        return formattedCategory
      },
    )

    const results = await Promise.allSettled(
      formattedCategoriesData.map(categoryData =>
        payload.create({
          collection: 'categories',
          data: categoryData,
        }),
      ),
    )
    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )

    spinner.succeed(`Successfully created categories.`)

    return formattedResults
  } catch (error) {
    spinner.fail(`Failed to create categories`)

    throw error
  }
}

export default seed
