import { Ora } from 'ora'

export const seedProductsDetails = async ({ spinner }: { spinner: Ora }) => {
  spinner.start(`Started creating product details...`)
  try {
    spinner.succeed(`Successfully created product details...`)
  } catch (error) {
    spinner.fail(`Failed creating product details...`)
    throw error
  }
}
