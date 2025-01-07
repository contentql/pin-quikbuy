#!/usr/bin/env node
// ? For interactive confirmation prompts
import { confirm, select, text } from '@clack/prompts'
// ? For colored terminal output
import chalk from 'chalk'
// ? To load environment variables from a .env file
import 'dotenv/config'
// ? For filesystem operations
import fs from 'fs'
// ? For special characters (tick and cross) in output
// ? For MongoDB database operations
import { MongoClient } from 'mongodb'
import ora from 'ora'
// ? For displaying a loading spinner
import path from 'path'

// ! Import seeding functions
import { seedCategories } from '@/seed/categories'
import { seedHomePage } from '@/seed/home-page'
import { seedOrders } from '@/seed/orders'
import { seedOrdersPage } from '@/seed/orders-page'
import { seedProductDetailsPage } from '@/seed/product-details-page'
import { seedProducts } from '@/seed/products'
import { seedProductsPage } from '@/seed/products-page'
import { seedSiteSettings } from '@/seed/site-settings'

// MongoDB connection URI
const { DATABASE_URI, SQLITE_DB_PATH } = process.env

// Extract database name from the MongoDB URI
const extractDatabaseName = (uri: string): string | null => {
  const match = uri.match(/\/([^/?]+)(\?|$)/)
  return match ? match[1] : null
}

// Drop MongoDB database
const dropMongoDatabase = async (): Promise<boolean> => {
  const databaseName = extractDatabaseName(DATABASE_URI || '')
  if (!DATABASE_URI || !databaseName) {
    console.error(chalk.red('Invalid DATABASE_URI for MongoDB.'))
    process.exit(1)
  }

  const client = new MongoClient(DATABASE_URI)
  try {
    await client.connect()
    console.log(
      chalk.green(
        `Connected to MongoDB.\nDropping the database "${databaseName}"...`,
      ),
    )
    const db = client.db(databaseName)
    await db.dropDatabase()
    console.log(chalk.green(`Database "${databaseName}" dropped successfully.`))
    return true
  } catch (error) {
    console.error(chalk.red('Error dropping the MongoDB database:'), error)
    return false
  } finally {
    await client.close()
  }
}

// Drop SQLite database (local)
const dropSQLiteLocalDatabase = async (): Promise<boolean> => {
  const dbPath = await text({
    message: 'Enter the path to the SQLite database file:',
    placeholder: SQLITE_DB_PATH || './database.sqlite',
  })

  if (!dbPath) {
    console.error(chalk.red('SQLite database path is required.'))
    process.exit(1)
  }

  const resolvedPath = path.resolve(dbPath as string)
  if (fs.existsSync(resolvedPath)) {
    fs.unlinkSync(resolvedPath)
    console.log(chalk.green(`Deleted SQLite database file at ${resolvedPath}.`))
    return true
  } else {
    console.error(
      chalk.red(`SQLite database file not found at ${resolvedPath}.`),
    )
    return false
  }
}

// Drop SQLite database (online)
const dropSQLiteOnlineDatabase = async (): Promise<boolean> => {
  console.log(
    chalk.yellow('Online SQLite database logic is not implemented yet.'),
  )
  // Implement online SQLite database handling logic here if necessary
  return false
}

// Execute seeding
const executeSeeding = async () => {
  const spinner = ora({
    text: 'Starting the seeding process...',
    color: 'cyan',
    spinner: 'dots',
  }).start()

  try {
    await seedCategories(spinner)
    await seedProducts(spinner)
    await seedOrders(spinner)
    await seedProductsPage(spinner)
    await seedProductDetailsPage(spinner)
    await seedOrdersPage(spinner)
    await seedHomePage(spinner)
    await seedSiteSettings(spinner)
  } catch (error) {
    spinner.fail('Error running seeds.')
    console.error(chalk.red('Error running seeds:'), error)
  } finally {
    spinner.stop()
    console.log(chalk.green('Seeding completed.'))
    process.exit(0)
  }
}

// Ask for confirmation to run seeding
const askForConfirmation = async () => {
  const answer = await confirm({
    message: 'Are you sure you want to run the seeding process?',
    initialValue: false,
  })

  if (answer) {
    executeSeeding()
  } else {
    console.log(chalk.yellow('Seeding process cancelled.'))
    process.exit(0)
  }
}

// Ask for database options
const askDatabaseType = async () => {
  const dbType = await select({
    message: 'Which database are you using?',
    options: [
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'sqlite', label: 'SQLite' },
    ],
  })

  if (dbType === 'mongodb') {
    const dropSuccess = await dropMongoDatabase()
    if (dropSuccess) {
      askForConfirmation()
    } else {
      console.error(
        chalk.red('Failed to drop MongoDB database. Seeding aborted.'),
      )
      process.exit(1)
    }
  } else if (dbType === 'sqlite') {
    const sqliteType = await select({
      message: 'Are you using a local or online SQLite database?',
      options: [
        { value: 'local', label: 'Local' },
        { value: 'online', label: 'Online' },
      ],
    })

    if (sqliteType === 'local') {
      const dropSuccess = await dropSQLiteLocalDatabase()
      if (dropSuccess) {
        askForConfirmation()
      } else {
        console.error(
          chalk.red('Failed to drop SQLite database. Seeding aborted.'),
        )
        process.exit(1)
      }
    } else if (sqliteType === 'online') {
      const dropSuccess = await dropSQLiteOnlineDatabase()
      if (dropSuccess) {
        askForConfirmation()
      } else {
        console.error(
          chalk.red(
            'Failed to handle online SQLite database. Seeding aborted.',
          ),
        )
        process.exit(1)
      }
    }
  }
}

// Start the script
askDatabaseType()
