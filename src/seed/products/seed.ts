import { Ora } from 'ora'

export const seedProducts = async ({ spinner }: { spinner: Ora }) => {
  spinner.start(`Started creating products...`)
  try {
    spinner.succeed(`Successfully created products...`)
  } catch (error) {
    spinner.fail(`Failed creating products...`)
    throw error
  }
}
