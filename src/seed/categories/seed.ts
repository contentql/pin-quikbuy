import { Ora } from 'ora'

export const seedCategories = async ({ spinner }: { spinner: Ora }) => {
  spinner.start(`Started creating categories...`)
  try {
    spinner.succeed(`Successfully created categories...`)
  } catch (error) {
    spinner.fail(`Failed creating categories...`)
    throw error
  }
}
